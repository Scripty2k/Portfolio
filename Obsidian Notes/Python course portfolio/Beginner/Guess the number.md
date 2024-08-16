I've made a game called guess the number where the computer generates a random number from 1 to 10. The player needs to guess the right number and the computer tells if the player guessed it right:

```python
import random

# Generate a random number between 1 and 10
number = random.randint(1, 10)

print("Guess the number (between 1 and 10)")

# Get the user's guess and convert it to an integer
guess = int(input("Enter your number: "))

# Compare the guess to the actual number
if guess == number:
    print("Congratulations! You guessed the correct number!")
else:
    print(f"Sorry, the correct number was {number}. Better luck next time!")

```


