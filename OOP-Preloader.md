1. Execute the entire example from the MEET recording and try to understand the code, test it.
2. In the class "CircularPreloader", change the way the frames are "shifted", this time from the back to the beginning
3. In the class "CircularPreloader", find another way to "iterate" the frames without using: push, pop, unshift, or shift
4. Improve the init() + onload() methods, so both descendant classes can use different "speed" of animation
5. Add another class called IncompletePreloader (named this way because you are not going to provide all the methods required ), this class should be an exact copy of the ProgressPreloader class, but you have to remove the "condition" method definition from it
6. Start a preloader of this type and check it's behaviour, what changed? why? - explain in details!
7. We will modify the BasePreloader in such a manner that it will indirectly "check" if the descendant implemented the "condition" logic, to do this, add this code


     throw new ReferenceError("You must implement the condition() method inside the inheriting class")


     inside the "condition" method of the BasePreloader


8. Run the modified code and explain what happens, explain detailed: what is "throw", why we used new ReferenceError and not simply Error? What is ReferenceError?
9. Apply the same "pattern" to the other abstract methods that have to be checked for implementation inside the descending classes
10. None of our classes apply the "encapsulation" principle, is it bad? - yes, let's imagine this scenario:
 - we create a preloader object    let p = new ProgressPreloader(....), after which it starts, and somewhere lower in the code by accident the coder writes " if( p.timerId = null ) " - instead of comparison, his code can accidentally make the preloader "forget" it's timer, which will result in an never clearing interval (forever looped timer).
  
 Your job is by using set/get and the encapsulation principle, to make it so the "timerId" property can be set only inside the class (any of the classes), but so it can be ONLY READ from the outside code