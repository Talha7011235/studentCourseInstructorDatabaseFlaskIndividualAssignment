import requests

# api-endpoint
URL = "http://127.0.0.1:5000/api/student"
  
  
# defining a params dict for the parameters to be sent to the API
PARAMS = {'name': "John Smith",
 	  'number_of_credits_earned': 34}
  
# sending get request and saving the response as response object
r = requests.post(url = URL, data = PARAMS)

# extracting response text 
pastebin_url = r.text
print("The pastebin URL is:%s"%pastebin_url)