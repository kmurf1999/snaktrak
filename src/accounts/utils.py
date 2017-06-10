from snaktrak.settings.dev import NEXMO_KEY, NEXMO_SECRET, NEXMO_PHONE_NUMBER
import urllib

def sendSMS(to, msg):
    """Sends msg over nexmo"""
    """to: phone_number to send to"""
    """msg: msg to send"""
    params = {
        "api_key": NEXMO_KEY,
        "api_secret": NEXMO_SECRET,
        "to": to,
        "from": NEXMO_PHONE_NUMBER,
        "text": msg
    }

    url = "https://rest.nexmo.com/sms/json?" + urllib.parse.urlencode(params)

    request = urllib.request.Request(url, headers={'Accept': 'application/json'})
    urllib.request.urlopen(request)
