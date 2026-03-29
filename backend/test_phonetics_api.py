import requests

BASE_URL = "http://127.0.0.1:8000/phonetics"

def test_api():
    try:
        # Test /all
        print("Testing /all...")
        res = requests.get(f"{BASE_URL}/all")
        if res.status_code == 200:
            print(f"Success: Found {len(res.json())} phonemes.")
        else:
            print(f"Failed: {res.status_code}")

        # Test /crosswalk/ʃ
        print("\nTesting /crosswalk/ʃ...")
        res = requests.get(f"{BASE_URL}/crosswalk/ʃ")
        if res.status_code == 200:
            data = res.json()
            print(f"IPA: {data['ipa_symbol']}")
            for cw in data['crosswalks']:
                print(f"  {cw['language']}: {cw['grapheme']} ({cw['example']})")
        else:
            print(f"Failed: {res.status_code}")

        # Test /filter?manner=Nasal
        print("\nTesting /filter?manner=Nasal...")
        res = requests.get(f"{BASE_URL}/filter?manner=Nasal")
        if res.status_code == 200:
            data = res.json()
            print(f"Found {len(data)} Nasal phonemes.")
            for p in data:
                print(f"  {p['ipa_symbol']} ({p['place']})")
        else:
            print(f"Failed: {res.status_code}")

    except Exception as e:
        print(f"Error: {e}. (Is the backend running?)")

if __name__ == "__main__":
    test_api()
