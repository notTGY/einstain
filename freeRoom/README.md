# [Free room](https://nottgy.github.io/einstain/freeRoom)
Okay, so this has big underlying story behind

## TL;DR
this project displays list of free rooms at the current time at the [MIPT uni](https://mipt.ru).

## The story
So, I got into MIPT and we have such a feature: if a student finds free, unlocked room in one of our buildings, 
he/she can safely enter and study there, or do whatever) So I decided to make a thing, that would give me the list of currently free rooms of that building.
For this I firstly needed to parse excel into json, cause we have our timetables written in an excel file.
Then I detect all possible open rooms of that building.
At the app opening time I get currently free rooms and display them based on time of the day.

After all, this was quite an interesting experience of doing something helpful with my skill)
