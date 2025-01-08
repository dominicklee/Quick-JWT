# QuickJWT
Library to create, sign, and validate JWT tokens in your browser using JavaScript. Additional server-side tool to decode and validate JWT tokens in PHP.

## Overview ##
This repository contains two directories - `js` and `php`. Each folder contains the `QuickJWT` library with examples for its respective programming language.

## Demo ##

See the live demo here:
[https://rawcdn.githack.com/dominicklee/Quick-JWT/main/js/index.html](https://rawcdn.githack.com/dominicklee/Quick-JWT/main/js/index.html)

## QuickJWT JS Usage ##
1. To use the CDN Hosted Link, include the following in your HTML:
```html
<script src="https://cdn.jsdelivr.net/gh/dominicklee/Quick-JWT@latest/js/quick-jwt.js"></script>
```

2. This library needs the *CryptoJS* library for cryptography. For your convenience, you can dynamically load it in QuickJWT like so:
```javascript
QuickJWT.loadCryptoJS(() => {
  // Run your JS code here after CryptoJS loads
});
```

3. **Generate your JWT:** Declare your `payload` and `secret` variables. Then use `QuickJWT.sign` to generate and sign your JWT. The output will be your JWT string.
```javascript
QuickJWT.loadCryptoJS(() => {
  const payload = { userID: "1234567890", name: "John Doe", iat: 1516239022 };
  const secret = "your-256-bit-secret";	//change this

  // Create a token
  const token = QuickJWT.sign(payload, secret);
  console.log("Generated Token:", token);
});
```

4. **Validate and decode JWT:** Declare your JWT `token` and the `secret` you want to validate the JWT against.
```javascript
QuickJWT.loadCryptoJS(() => {
  const token = 'your-JWT-token-here';	//change this
  const secret = "your-256-bit-secret";	//change this
  
  // Validate the token
  const isValid = QuickJWT.validate(token, secret);
  console.log("Is Valid:", isValid); // Output: true (if secret matches)
  
  // Decode the payload contents if signature is valid 
  if (isValid) {
    // Decode the payload
    const decodedPayload = QuickJWT.decode(token);
    console.log("Decoded Payload:", decodedPayload);
  }
});
```

## QuickJWT PHP Usage ##
1. To use the `QuickJWT` library in PHP, include it in your PHP code:
```php
include('quick-jwt.php');	// Include the QuickJWT library
```

2. **Generate your JWT:** Declare your `payload` and `secret` variables. Then use `QuickJWT::sign()` to generate and sign your JWT. The output will be your JWT string.
```php
	// Example Usage:
	$payload = ['userID' => '1234567890', 'name' => 'John Doe', 'iat' => time()];
	$secret = "your-256-bit-secret";

	// Sign a JWT
	$token = QuickJWT::sign($payload, $secret);
	echo "Generated Token: $token <br>\n";
```

3. **Validate and decode JWT:** Declare your JWT `token` and the `secret` you want to validate the JWT against.
```php
	$token = "your-JWT-token-here";	//change this
	$secret = "your-256-bit-secret";	//change this

	// Validate the JWT
	$isValid = QuickJWT::validate($secret, $token);
	echo $isValid ? "JWT is valid.\n" : "JWT is invalid. <br>\n";
	
	if ($isValid) {
		// Decode the JWT
		$decodedPayload = QuickJWT::decode($token);
		echo "<pre>".var_export($decodedPayload, true)."</pre>";
	}
```