// App.js 

import React, { useState, useEffect } from "react"; 
import { 
	View, 
	Text, 
	TextInput, 
	TouchableOpacity, 
	StyleSheet, 
} from "react-native"; 

const App = () => { 
	const [term, setTerm] = useState(""); 
	const [result, setResult] = useState(""); 
	const [secretNum] = useState(generateRandomNumber()); 
	const [stepCount, setStepCount] = useState(0); 

	useEffect(() => { 
	
		// Reset step count when the secret 
		// number changes. 
		setStepCount(0); 
	}, [secretNum]); 

	function generateRandomNumber() { 
		return Math.floor(Math.random() * 100) + 1; 
	} 

	function handleChange(text) { 
		setTerm(text); 
	} 

	function checkGuess() { 
		let newResult = ""; 

		if (term === "") { 
			newResult = "Enter Valid Input"; 
		} else if ( 
			isNaN(term) || 
			parseInt(term) < 1 || 
			parseInt(term) > 100 
		) { 
			newResult = 
				"Enter a valid number between 1 and 100"; 
		} else { 
			setStepCount(stepCount + 1); 

			if (parseInt(term) < secretNum) { 
				newResult = "Lower"; 
			} else if (parseInt(term) > secretNum) { 
				newResult = "Higher"; 
			} else { 
				newResult = `Yippee, correct! It took you ${ 
					stepCount + 1 
				} ${stepCount === 1 ? "step" : "steps"}.`; 
			} 
		} 

		setResult(newResult); 
	} 

	return ( 
		<View style={styles.container}> 
			<Text style={styles.head}> 
				Guess Number between 1 to 100 
			</Text> 
			<TextInput 
				style={styles.input} 
				placeholder="Enter your guess"
				onChangeText={handleChange} 
				value={term} 
				keyboardType="numeric"
			/> 
			<TouchableOpacity 
				style={styles.button} 
				onPress={checkGuess} 
			> 
				<Text style={styles.buttonText}>Check</Text> 
			</TouchableOpacity> 
			<Text style={styles.result}> 
				You Guessed: {result} 
			</Text> 
		</View> 
	); 
}; 

// ... Rest of your code remains unchanged 

const styles = StyleSheet.create({ 
	container: { 
		flex: 1, 
		alignItems: "center", 
		justifyContent: "center", 
		backgroundColor: "#f2f2f2", 
		padding: 16, 
	}, 
	head: { 
		fontWeight: "bold", 
		fontSize: 24, 
		marginBottom: 20, 
		color: "#333", 
	}, 
	input: { 
		padding: 10, 
		borderWidth: 1, 
		borderColor: "#ccc", 
		borderRadius: 10, 
		width: "80%", 
		marginBottom: 20, 
		backgroundColor: "#fff", 
		fontSize: 18, 
	}, 
	button: { 
		backgroundColor: "#007BFF", 
		borderRadius: 10, 
		paddingVertical: 12, 
		paddingHorizontal: 24, 
	}, 
	buttonText: { 
		color: "#fff", 
		fontSize: 18, 
		fontWeight: "bold", 
	}, 
	result: { 
		marginTop: 20, 
		fontSize: 18, 
		color: "#333", 
		fontWeight: "bold", 
	}, 
}); 

export default App;
