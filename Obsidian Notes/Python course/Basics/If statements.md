#Basics 

```python
is_male = True  
is_female = False  
  
if is_male and is_female:  
    print("Male")  
    print("Female")  
  
if is_male and not is_female:  
    print("Male")  
  
if is_female and not is_male:  
    print("Female")
```
This is really basic, but we can add an else function to make it shorter.

This one is better:
```python
is_male = True  
is_female = False  
  
if is_male:  
    print("Male")  
else:  
    print("Female")
```



**This code checks which number is the biggest, then prints it out**

with return statements:
```python
def max_num(num1, num2, num3):  
    if num1 >= num2 and num1 >= num3:  
        return num1  
  
    elif num2 >= num1 and num2 >= num3:  
        return num2  
  
    elif num3 >= num1 and num3 >= num2:  
        return num3  
  
print(max_num(3, 5, 3))
```


