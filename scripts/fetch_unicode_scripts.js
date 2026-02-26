#!/usr/bin/env node
import https from 'https';
import fs from 'fs';
import path from 'path';

const URL = 'https://www.unicode.org/Public/UNIDATA/Scripts.txt';
const outDir = path.join('src','data','datasets','linguistics');
const outFile = path.join(outDir,'unicode_scripts.json');

function fetchTxt(url){
  return new Promise((resolve,reject)=>{
    https.get(url,res=>{
      if(res.statusCode!==200) return reject(new Error('HTTP '+res.statusCode));
      let data='';
      res.setEncoding('utf8');
      res.on('data',c=>data+=c);
      res.on('end',()=>resolve(data));
    }).on('error',reject);
  });
}

function parseScripts(txt){
  const scripts = new Set();
  const lines = txt.split(/\r?\n/);
  for(const line of lines){
    const m = line.match(/;\s*([A-Za-z_]+)\s+#/);
    if(m) scripts.add(m[1]);
  }
  return Array.from(scripts).sort((a,b)=>a.localeCompare(b));
}

async function main(){
  try{
    const txt = await fetchTxt(URL);
    const scripts = parseScripts(txt);
    if(!fs.existsSync(outDir)) fs.mkdirSync(outDir,{recursive:true});
    fs.writeFileSync(outFile, JSON.stringify({version:'1.0.0','source':URL,updatedAt:new Date().toISOString().slice(0,10),scripts},null,2),'utf8');
    console.log('Wrote',outFile,'with',scripts.length,'scripts');
  }catch(err){
    console.error('Error:',err.message);
    process.exitCode=1;
  }
}

main();
