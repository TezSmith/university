unit - test application w/o external dependencies. Cheap & execute fast. (test classes or mulitple)
integration - test class or component w/ external depeencies. (Longer to execute - RW a DB)
end to end - drives an app through it's UI. (One popular tool - Selenium)
Greatest confidence but slow (launching / and UI nav) and brittle ( small Change can break it)

(simple/precise/fast) -> cover unit test gaps -> test with only key functions of the app
Unit -> Integration -> End to End
(edge cases)  | Read or Writing Data

Test Frameworks
Jasmine
Mocha (most popular but needs plugins like Chai & Sinon 
Jest (a wrapper for Jasmine)

The number of unit tests that a function has should be measured by the amount of execution paths that there are.