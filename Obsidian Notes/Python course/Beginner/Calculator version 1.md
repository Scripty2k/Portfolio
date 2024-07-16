#Beginner


So I started doing this at first:

Example 1:
```python
num1 = input("Enter a number: ")  
num2 = input("Enter another number: ")  
  
result = num1 + num2  
  
print(result)
```

Here in example 1, you can see that the user can enter 2 prompted numbers. For example: The user will enter 2 and 5 as their chosen numbers. The print will be 25.

And that's not what I wanted to achieve so I did this:

Example 2
```python
num1 = input("Enter a number: ")  
num2 = input("Enter another number: ")  
  
result = int(num1) + int(num2)  
  
print(result)
```

In this example, the numbers will be converted into integers. It eventually does the math the correct way by adding up.

If the user enters 2 and 5, the answer would be 7.

But there's one thing and that is that whenever I use decimal numbers, the code will break.

So I decided to convert it to float:
```python
num1 = input("Enter a number: ")  
num2 = input("Enter another number: ")  
  
result = float(num1) + float(num2)  
  
print(result)
```

The final script