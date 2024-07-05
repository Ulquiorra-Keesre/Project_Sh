import requests

url = "http://127.0.0.1:8000/items"
headers = {"Content-Type": "text/plain"}
data = "разработчик"

response = requests.post(url, headers=headers, data=data)
print("Response status code:", response.status_code)
print("Response text:", response.text)
try:
    print("Response JSON:", response.json())
except requests.exceptions.JSONDecodeError:
    print("Failed to decode JSON from response.")