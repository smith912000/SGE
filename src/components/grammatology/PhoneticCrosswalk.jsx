import React, { useState, useEffect } from 'react';
import { M3 } from '../../theme/m3.js';
import Card from '../ui/Card.jsx';
import { LETTER_DB } from '../../data/grammatology/letterDb.js';
import staticPhoneticsData from '../../data/grammatology/phonetics_data.json';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://127.0.0.1:8000";

const PhoneticCrosswalk = () => {
    const [phonemes, setPhonemes] = useState([]);
    const [selectedIpa, setSelectedIpa] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Filter states
    const [mannerFilter, setMannerFilter] = useState('');
    const [placeFilter, setPlaceFilter] = useState('');

    useEffect(() => {
        fetchPhonemes();
    }, []);

    const fetchPhonemes = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${BACKEND_URL}/phonetics/all`);
            if (res.ok) {
                const data = await res.json();
                setPhonemes(data);
                if (data.length > 0 && !selectedIpa) setSelectedIpa(data[0]);
            } else {
                throw new Error("Backend unavailable");
            }
        } catch (err) {
            console.warn("Backend unavailable, falling back to static data.");
            setPhonemes(staticPhoneticsData);
            if (staticPhoneticsData.length > 0 && !selectedIpa) {
                setSelectedIpa(staticPhoneticsData[0]);
            }
        } finally {
            setLoading(false);
        }
    };

    const getLetterMapping = (ipaSym) => {
        if (!ipaSym) return null;
        return LETTER_DB.find(l => {
            const parts = l.ipa.split(',').map(p => p.trim().replace(/\//g, ''));
            return parts.includes(ipaSym.replace(/\//g, ''));
        });
    };

    const [searchFilter, setSearchFilter] = useState('');

    const filteredPhonemes = phonemes.filter(p => {
        return (mannerFilter === '' || p.manner === mannerFilter) &&
               (placeFilter === '' || p.place === placeFilter);
    });

    const manners = [...new Set(phonemes.map(p => p.manner))];
    const places = [...new Set(phonemes.map(p => p.place))];

    const getGroupedCrosswalks = (cws) => {
        const filtered = cws.filter(cw => 
            cw.language.toLowerCase().includes(searchFilter.toLowerCase()) ||
            cw.iso.toLowerCase().includes(searchFilter.toLowerCase()) ||
            cw.family.toLowerCase().includes(searchFilter.toLowerCase())
        );
        return filtered.reduce((acc, cw) => {
            if (!acc[cw.family]) acc[cw.family] = [];
            acc[cw.family].push(cw);
            return acc;
        }, {});
    };

    const rootMapping = getLetterMapping(selectedIpa?.ipa_symbol);

    if (loading) return <div style={{ color: M3.onSurfaceVariant, padding: 20, fontFamily: "'Share Tech Mono', monospace" }}>Loading phonetic matrix...</div>;
    if (error) return <div style={{ color: '#ff5252', padding: 20 }}>Error: {error}</div>;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Card title="Phonetic Feature Matrix">
                <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        <label style={{ fontSize: '0.7rem', color: M3.secondary }}>Manner</label>
                        <select 
                            value={mannerFilter} 
                            onChange={(e) => setMannerFilter(e.target.value)}
                            style={{ background: M3.surfaceContainerHighest, color: M3.onSurface, border: `1px solid ${M3.outlineVariant}`, borderRadius: 4, padding: '4px 8px', fontSize: '0.75rem' }}
                        >
                            <option value="">All Manners</option>
                            {manners.map(m => <option key={m} value={m}>{m}</option>)}
                        </select>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        <label style={{ fontSize: '0.7rem', color: M3.secondary }}>Place</label>
                        <select 
                            value={placeFilter} 
                            onChange={(e) => setPlaceFilter(e.target.value)}
                            style={{ background: M3.surfaceContainerHighest, color: M3.onSurface, border: `1px solid ${M3.outlineVariant}`, borderRadius: 4, padding: '4px 8px', fontSize: '0.75rem' }}
                        >
                            <option value="">All Places</option>
                            {places.map(p => <option key={p} value={p}>{p}</option>)}
                        </select>
                    </div>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {filteredPhonemes.map(p => (
                        <button
                            key={p.ipa_symbol}
                            onClick={() => setSelectedIpa(p)}
                            style={{
                                width: 44,
                                height: 44,
                                borderRadius: 8,
                                border: `1px solid ${selectedIpa?.ipa_symbol === p.ipa_symbol ? M3.primary : M3.outlineVariant}`,
                                background: selectedIpa?.ipa_symbol === p.ipa_symbol ? M3.primaryContainer : M3.surfaceContainer,
                                color: selectedIpa?.ipa_symbol === p.ipa_symbol ? M3.onPrimaryContainer : M3.onSurface,
                                fontSize: '1.1rem',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            {p.ipa_symbol}
                        </button>
                    ))}
                </div>
            </Card>

            {selectedIpa && (
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(250px, 1fr) 3fr', gap: 16 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        <Card title="Phonetic Features">
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                <FeatureItem label="IPA Symbol" value={selectedIpa.ipa_symbol} highlight />
                                <FeatureItem label="Manner" value={selectedIpa.manner} />
                                <FeatureItem label="Place" value={selectedIpa.place} />
                                <FeatureItem label="Voicing" value={selectedIpa.voicing ? "Voiced" : "Voiceless"} />
                                <FeatureItem label="Unicode" value={selectedIpa.unicode_hex} mono />
                            </div>
                        </Card>

                        <Card title="Symbolic Resonance">
                            {rootMapping ? (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                    <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:4 }}>
                                        <div style={{ fontSize:'2.5rem', color:M3.primary }}>{rootMapping.hebrew}</div>
                                        <div>
                                            <div style={{ fontSize:'1rem', fontWeight:'bold', color:M3.onSurface }}>{rootMapping.hebrewName}</div>
                                            <div style={{ fontSize:'0.65rem', color:M3.onSurfaceVariant }}>Root Letter Correspondence</div>
                                        </div>
                                    </div>
                                    <FeatureItem label="Symbolism" value={rootMapping.yetzirah.element || rootMapping.yetzirah.planet || rootMapping.yetzirah.sign || "—"} />
                                    <FeatureItem label="Gematria" value={rootMapping.gematria} />
                                    <FeatureItem label="Pictogram" value={rootMapping.acrophony?.split('/')[0] || "—"} />
                                    <div style={{ marginTop:8, padding:10, borderRadius:8, background:M3.surfaceContainerHigh, fontSize:'0.75rem', color:M3.onSurface, border:`1px solid ${M3.outlineVariant}`, textAlign:'center' }}>
                                        <div style={{ fontSize:'0.6rem', color:M3.secondary, marginBottom:4 }}>PHOENICIAN ORIGIN</div>
                                        <div style={{ fontSize:'1.8rem', color:M3.primary }}>{rootMapping.phoenician}</div>
                                    </div>
                                </div>
                            ) : (
                                <div style={{ fontSize:'0.75rem', color:M3.onSurfaceVariant, fontStyle:'italic', textAlign:'center', padding:'20px 0' }}>
                                    This phoneme does not have a direct correspondence in the 22 Root Letter alphabet.
                                </div>
                            )}
                        </Card>
                    </div>

                    <Card title="Cross-Lingual Crosswalk">
                        <div style={{ marginBottom: 12 }}>
                            <input 
                                type="text"
                                placeholder="Search language or family..."
                                value={searchFilter}
                                onChange={(e) => setSearchFilter(e.target.value)}
                                style={{ width: '100%', padding: '8px 12px', background: M3.surfaceContainer, border: `1px solid ${M3.outlineVariant}`, borderRadius: 8, color: M3.onSurface, fontSize: '0.8rem', outline: 'none' }}
                            />
                        </div>
                        <div style={{ maxHeight: '600px', overflowY: 'auto', border: `1px solid ${M3.outlineVariant}`, borderRadius: 8 }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead style={{ position: 'sticky', top: 0, background: M3.surfaceContainerHigh, zIndex: 1 }}>
                                    <tr style={{ textAlign: 'left' }}>
                                        <th style={{ padding: '10px 12px', fontSize: '0.7rem', color: M3.secondary, borderBottom: `1px solid ${M3.outlineVariant}` }}>Language</th>
                                        <th style={{ padding: '10px 12px', fontSize: '0.7rem', color: M3.secondary, borderBottom: `1px solid ${M3.outlineVariant}` }}>Grapheme</th>
                                        <th style={{ padding: '10px 12px', fontSize: '0.7rem', color: M3.secondary, borderBottom: `1px solid ${M3.outlineVariant}` }}>Example</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.entries(getGroupedCrosswalks(selectedIpa.crosswalks)).map(([family, cws]) => (
                                        <React.Fragment key={family}>
                                            <tr style={{ background: M3.surfaceContainerLow }}>
                                                <td colSpan="3" style={{ padding: '6px 12px', fontSize: '0.65rem', fontWeight: 'bold', color: M3.primary, textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: `1px solid ${M3.outlineVariant}44` }}>
                                                    {family} ({cws.length})
                                                </td>
                                            </tr>
                                            {cws.map((cw, i) => (
                                                <tr key={i} style={{ borderBottom: `1px solid ${M3.surfaceContainerHighest}44` }}>
                                                    <td style={{ padding: '8px 12px', fontSize: '0.8rem' }}>
                                                        <div style={{ color: M3.onSurface }}>{cw.language}</div>
                                                        <div style={{ fontSize: '0.65rem', color: M3.onSurfaceVariant }}>{cw.iso.toUpperCase()}</div>
                                                    </td>
                                                    <td style={{ padding: '8px 12px', fontSize: '1.1rem', fontWeight: 'bold', color: M3.primary }}>{cw.grapheme}</td>
                                                    <td style={{ padding: '8px 12px', fontSize: '0.75rem', fontStyle: 'italic', color: M3.onSurfaceVariant }}>{cw.example}</td>
                                                </tr>
                                            ))}
                                        </React.Fragment>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
};

const FeatureItem = ({ label, value, highlight, mono }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 4, borderBottom: `1px solid ${M3.surfaceContainerHighest}` }}>
        <span style={{ fontSize: '0.75rem', color: M3.onSurfaceVariant }}>{label}</span>
        <span style={{ 
            fontSize: highlight ? '1.1rem' : '0.85rem', 
            fontWeight: highlight ? 'bold' : 'normal',
            color: highlight ? M3.primary : M3.onSurface,
            fontFamily: mono ? "'Share Tech Mono', monospace" : 'inherit'
        }}>
            {value}
        </span>
    </div>
);

export default PhoneticCrosswalk;
