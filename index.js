const API_URL = 'https://api.github.com/repos/oleksandr-danylchenko/street-fighter/contents/resources/api/fighters.json';
const SECURITY_HEADERS = {
  headers: {
    authorization: "token %your_token%"
  }
};

fetch(API_URL, SECURITY_HEADERS);