from openai import OpenAI
import os

TOGETHER_API_KEY = "d8181088c3ceb9c018fe645c886e2a50920261698d79bc90ea5b4753b5787bb6"

client = OpenAI(api_key=TOGETHER_API_KEY, base_url='https://api.together.xyz')

# Input data
company_values_url = "https://about.google/intl/ALL_us/commitments/"

# Generate company values using OpenAI API
chat_completion = client.chat.completions.create(
    messages=[
        {"role": "system", "content": "You are an AI assistant"},
        {"role": "user", "content": f"Scrape company values from the webpage: {company_values_url}"},
    ],
    model="mistralai/Mixtral-8x7B-Instruct-v0.1",
    max_tokens=1024
)

company_values = chat_completion.choices[0].message.content

# Print the scraped company values
with open("values.txt", "w", encoding="utf-8") as output_file:
    output_file.write(company_values)

print(f"Company values saved to: values.txt")