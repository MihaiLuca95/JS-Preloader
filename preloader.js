// common preloader logic
// 1.Execute the entire example from the MEET recording and try to understand the code, test it.
class BasePreloader {
    constructor(rootDiv) {
        this.rootDiv = rootDiv;
        this.init();
        this.onload();
    }

    onload() {
        this.timerId = setInterval(() => {
            this.step();
            if(this.condition()) {
                clearInterval(this.timerId);
            }
            this.rootDiv.innerHTML = this.render();
        }, this.repeate)
    }
    

    // abstract methods
    init() {}
// 7. We will modify the BasePreloader in such a manner that it will indirectly "check" if the descendant implemented the "condition" logic
    condition() {
        throw new ReferenceError(`Condition is check as: ${this.check()}`)
    }
    check() {}
    step() {}
    render() {}
}

// progress like preloder component
class ProgressPreloader extends BasePreloader{

    constructor(rootDiv) {
        super(rootDiv)
    }

    init() {
        this.progress = 0;
        this.repeate = 500;
    }
// 8. Run the modified code and explain what happens, explain detailed: what is "throw", why we used new ReferenceError and not simply Error? What is ReferenceError?
// 8 Answer: 
// The (throw) statement: lets you create custom errors. JavaScript will actually create an Error object with two properties: name and message.
// ReferenceError: - represents an error when a non-existent variable is referenced.
// Why we used new ReferenceError and not simply Error? - All error types inherit from Error so checking the type with instanceof Error doesn’t give you any useful information.
    check() {
        return this.progress >= 100
    }
    // condition() {
    //     return this.progress >= 100
    // }
    step() {
        this.progress += 10;
    }
    render() {
        return `[ ${this.progress}% ]`
    }
}

class CircularPreloader extends BasePreloader {

    constructor(rootDiv) {
        super(rootDiv)
    }

    init() {
        this.duration = 3000; 
        this.frames = ['|', '/', '--', '\\'];
// 4. Improve the init() + onload() methods, so both descendant classes can use different "speed" of animation
        this.repeate = 250;
    }
    condition() {
        return this.duration <= 0;
    }
    step() {
        this.duration -= 250;
// 2. In the class "CircularPreloader", change the way the frames are "shifted", this time from the back to the beginning
        // let frame = this.frames.pop();
        // this.frames.unshift(frame);
// 3. In the class "CircularPreloader", find another way to "iterate" the frames
        let frame = this.frames.splice(0, 0, this.frames[3]);
        frame = this.frames.splice(4, 1);
    }
    render() {
        return `[ ${this.frames[0]} ]`;
    }
}

// 5. Add another class called IncompletePreloader
class IncompletePreloader extends BasePreloader {
    constructor(rootDiv) {
        super(rootDiv)
    }

    init() {
        this.progress = 0;
        this.repeate = 500;
    }
    condition() {
        
    }
    step() {
        this.progress += 10;
    }
    render() {
        return `[ ${this.progress}% ]`
    }
}

//////////////////////////////////
let pp1 = new ProgressPreloader(window['prel-1']);
let pp2 = new CircularPreloader(window['prel-2']);

// 6. Start a preloader of this type and check it's behaviour, what changed? why? - explain in details!
let pp3 = new IncompletePreloader(window['prel-3']);
// Answer 6: Acest preloader IncompletePreloader se va comporta fix ca si ProgressPreloader pina cind (this.progress == 100),
//           prin setInterval() la fiecare jumate de secunda (this.repeate = 500) va creste (this.progress) 
//           cu pasul 10, cind (this.progress == 100) datorita conditiei (this.progress >= 100) setata in clasa ProgressPreloader
//           se va returna ca 'true' si se va executa codul din interiorul blocului 'if' clearInterval()
//           care va anula actiunea cronometrata/repetata care a fost stabilita de setInterval(). Pe cind 
//           in interiorul clasei IncompletePreloader si metodei condition() ii lipseste  condition,
//           'if' va returna permanent 'false' si codul din interiorul blocului 'if' niciodata nu se va executa 
//           si (this.progress) va creste la infinit cu pasul 10 la fiecare jumate de secunda .