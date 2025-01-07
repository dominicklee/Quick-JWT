/*
* Project: Quick JWT
* Version: 1.0.0
* Description: Tool to generate, sign, and validate JWT tokens in the browser.
* Author: Dominick Lee
* License: MIT License
* Website: https://github.com/dominicklee/Quick-JWT
*/

class QuickJWT {
  // Utility function to encode in base64url format
  static base64url(source) {
    let encodedSource = CryptoJS.enc.Base64.stringify(source);
    encodedSource = encodedSource.replace(/=+$/, ''); // Remove padding
    encodedSource = encodedSource.replace(/\+/g, '-'); // Replace '+' with '-'
    encodedSource = encodedSource.replace(/\//g, '_'); // Replace '/' with '_'
    return encodedSource;
  }

  // Function to generate a signed JWT
  static sign(payload, secretOrPrivateKey) {
    const header = { alg: 'HS256', typ: 'JWT' };
    const stringifiedHeader = CryptoJS.enc.Utf8.parse(JSON.stringify(header));
    const encodedHeader = this.base64url(stringifiedHeader);
    const stringifiedPayload = CryptoJS.enc.Utf8.parse(JSON.stringify(payload));
    const encodedPayload = this.base64url(stringifiedPayload);
    const dataToSign = `${encodedHeader}.${encodedPayload}`;
    const signature = CryptoJS.HmacSHA256(dataToSign, secretOrPrivateKey);
    const encodedSignature = this.base64url(signature);
    return `${encodedHeader}.${encodedPayload}.${encodedSignature}`;
  }

  // Function to validate the signature of a JWT. Returns true if valid
  static validate(jwt, secretOrPrivateKey) {
    const parts = jwt.split('.');
    if (parts.length !== 3) {
      return false;
    }
    const [encodedHeader, encodedPayload, encodedSignature] = parts;
    const dataToSign = `${encodedHeader}.${encodedPayload}`;
    const signature = CryptoJS.HmacSHA256(dataToSign, secretOrPrivateKey);
    const expectedSignature = this.base64url(signature);
    return expectedSignature === encodedSignature;
  }
  
  // Function to decode the payload of a JWT
  static decode(jwt) {
    const parts = jwt.split('.');
    if (parts.length !== 3) {
      return null; // Invalid JWT structure
    }

    const encodedPayload = parts[1];
    try {
      // Decode the payload from base64url
      const decodedPayload = atob(encodedPayload.replace(/-/g, '+').replace(/_/g, '/'));
      // Parse the JSON string into an object
      return JSON.parse(decodedPayload);
    } catch (e) {
      console.error("Failed to decode JWT payload:", e);
      return null; // Return null if JSON is invalid
    }
  }

  // Function to load CryptoJS dynamically, if not already loaded
  static loadCryptoJS(callback) {
    if (typeof CryptoJS !== 'undefined') {
      console.log("CryptoJS is already loaded.");
      callback();
      return;
    }

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.2.0/crypto-js.min.js';

    script.onload = () => {
      console.log("CryptoJS loaded successfully.");
      callback();
    };

    script.onerror = () => {
      console.error("Failed to load CryptoJS. Please check the URL.");
    };

    document.head.appendChild(script);
  }
}

