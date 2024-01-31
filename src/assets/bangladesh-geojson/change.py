import requests
import json

def fetch_country_data():
    url = 'https://restcountries.com/v3.1/all'
    response = requests.get(url)

    if response.status_code == 200:
        countries = response.json()
        return countries
    else:
        print(f"Failed to fetch data. Status Code: {response.status_code}")
        return None

def generate_name_nationality_dataset(countries):
    dataset = []

    for country in countries:
        country_name = country['name']['common']
        nationality = country.get('demonym', 'Unknown')

        entry = {
            "country": country_name,
            "nationality": nationality
        }

        dataset.append(entry)

    return dataset

def save_to_json(data, filename='countries_data.json'):
    with open(filename, 'w', encoding='utf-8') as json_file:
        json.dump(data, json_file, ensure_ascii=False, indent=2)

if __name__ == "__main__":
    all_countries = fetch_country_data()

    if all_countries:
        name_nationality_dataset = generate_name_nationality_dataset(all_countries)
        save_to_json(name_nationality_dataset)
        print("Data saved to countries_data.json")
