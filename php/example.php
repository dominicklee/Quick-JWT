<?php
	include('quick-jwt.php');	// Include the QuickJWT library
	
	// Example Usage:
	$payload = ['userID' => '1234567890', 'name' => 'John Doe', 'iat' => time()];
	$secret = "your-256-bit-secret";

	// Sign a JWT
	$token = QuickJWT::sign($payload, $secret);
	echo "Generated Token: $token <br>\n";

	// Validate the JWT
	$isValid = QuickJWT::validate($secret, $token);
	echo $isValid ? "JWT is valid.\n" : "JWT is invalid. <br>\n";
	
	// Decode the JWT
	$decodedPayload = QuickJWT::decode($token);
	echo "<pre>".var_export($decodedPayload, true)."</pre>";