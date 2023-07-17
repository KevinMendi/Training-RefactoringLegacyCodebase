# Training-RefactoringLegacyCodebase

**CHAPTER 2 - Principles in Refactoring**
- Refactoring(noun): a change made to the internal structure of software to make it easier to understand and cheaper to modify without changing its observable behavior.

- Refactoring(verb): to restructure software by applying a series of refactorings without changing its observable behavior.

- Each inividual refactoring is either pretty small itself or a combination of small steps. As a result, when I’m refactoring, my code doesn’t spend much time in a broken state, allowing me to stop at any moment even if I haven’t finished.

- Refactoring may seem inefficient to people who first come across it and watch me making lots of tiny steps, when a single bigger step would do. But the tiny steps allow me to go faster because they compose so well—and, crucially, because I don’t spend any time debugging.

**Refactoring VS. Code Optimization**         
- Refactoring is always done to make the code “easier to understand and cheaper to modify.” This might speed things up or slow things down. 
- Performance optimization, I only care about speeding up the program, and am prepared to end up with code that is harder to work with if I really need that improved performance.

- Without refactoring, the internal design—the architecture—of software tends to decay


**Why should we refactor ?**
-  it is a valuable tool—a pair of silver pliers that helps you keep a good grip on your code. Refactoring is a tool that can—and should—be used for several purposes.

**Refactoring Helps Me Program Faster**
- But doesn’t the time I spend on refactoring reduce the speed of development?
    - When I talk to software developers who have been working on a system for a while, I often hear that they were able to make progress rapidly at first, but now it takes much longer to add new features. Every new feature requires more and more time to understand how to fit it into the existing code base, and once it’s added, bugs often crop up that take even longer to fix. The code base starts looking like a series of patches covering patches, and it takes an exercise in archaeology to figure out how things work. This burden slows down adding new features—to the point that developers wish they could start again from a blank slate.

**WHEN SHOULD WE REFACTOR?**
- Refactoring is something I do every hour I program. I have noticed a number of ways it fits into my workflow.

**The Rule of Three**
 - Here’s a guideline Don Roberts gave me: The first time you do something, you just do it. The second time you do something similar, you wince at the duplication, but you do the duplicate thing anyway. The third time you do something similar, you refactor. Or for those who like baseball: Three strikes, then you refactor.

**Preparatory Refactoring—Making It Easier to Add a Feature**
- “It’s like I want to go 100 miles east but instead of just traipsing through the woods, I’m going to drive 20 miles north to the highway and then I’m going to go 100 miles east at three times the speed I could have if I just went straight there. When people are pushing you to just go straight there, sometimes you need to say, ‘Wait, I need to check the map and find the quickest route.’ The preparatory refactoring does that for me.” — Jessica Kerr

**Litter-Pickup Refactoring**
- There’s a bit of a tradeoff here. I don’t want to spend a lot of time distracted from the task I’m currently doing, but I also don’t want to leave the trash lying around and getting in the way of future changes. If it’s easy to change, I’ll do it right away. If it’s a bit more effort to fix, I might make a note of it and fix it when I’m done with my immediate task.
- As the old camping adage says, always leave the camp site cleaner than when you found it. If I make it a little better each time I pass through the code, over time it will get fixed. The nice thing about refactoring is that I don’t break the code with each small step—so, sometimes, it takes months to complete the job but the code is never broken even when I’m part way through it.

**NOTE:**
- *TIP: If someone says their code was broken for a couple of days while they are refactoring, you can be pretty sure they were not refactoring.*

- Kent Beck: “I’m not a great programmer; I’m just a good programmer with great habits.” Refactoring helps me be much more effective at writing robust code.



**Planned and Opportunistic Refactoring**
- Refactoring isn’t an activity that’s separated from programming—any more than you set aside time to write if statements. I don’t put time on my plans to do refactoring; most refactoring happens while I’m doing other things.

**Long-Term Refactoring**
- a useful strategy is to agree to gradually work on the problem over the course of the next few weeks. Whenever anyone goes near any code that’s in the refactoring zone, they move it a little way in the direction they want to improve. This takes advantage of the fact that refactoring doesn’t break the code—each small change leaves everything in a still­working state.

**Refactoring in a Code Review**
- Do regular code reviews
- Code reviews help spread knowledge through a development team
- Reviews help more experienced developers pass knowledge to those less experienced
- Reviews also give the opportunity for more people to suggest useful ideas
- It’s better to have the original author of the code present because the author can provide context on the code and fully appreciate the reviewers’ intentions for their changes

- *TIP: If I need to add a new function and the design does not suit the change, I find it’s quicker to refactor first and then add the function. If I need to fix a bug, I need to understand how the software works—and I find refactoring is the fastest way to do this*


**When Should I Not Refactor?**
- If I run across code that is a mess, but I don’t need to modify it, then I don’t need to refactor it
- When it’s easier to rewrite it than to refactor it

**PROBLEMS WITH REFACTORING**
- **Slowing Down New Features**
    - Although many people see time spent refactoring as slowing down the development of new features, the whole purpose of refactoring is to speed things up
    - *TIP: The whole purpose of refactoring is to make us program faster, producing more value with less effort.*
    -  I certainly will do it if I see that it makes my new feature easier to implement
    - Sometimes it takes me a couple of times seeing some particular ugliness before I decide to refactor it away
    - I’m more likely to not refactor if it’s part of the code I rarely touch and the cost of the inconvenience isn’t something I feel very often

- **Code Ownership**
    - I cannot make the kinds of changes I want without breaking my clients
    - When renaming a function, I need to use Rename Function (124) and to retain the old declaration as a pass­through to the new one. This complicates the interface—but it is the price I must pay to avoid breaking my clients
    - I may be able to mark the old interface as deprecated and, in time, retire it, but sometimes I have to retain that interface forever
    
- **Branches**
    - a common approach in teams is for each team member to work on a branch of the code base using a version control system, and do considerable work on that branch before integrating with a mainline
    - Often, this involves building a whole feature on a branch, not integrating into the mainline until the feature is ready to be released into production.
    - There are downsides to feature branches like this.
        - The longer I work on an isolated branch, the harder the job of integrating my work with mainline is going to be when I’m done
        - Modern version control systems can do wonders with merging complex changes to the program text, but they are blind to the semantics of the code. If I’ve changed the name of a function, my version control tool may easily integrate my changes with Rachel’s. But if, in her branch, she added a call to a function that I’ve renamed in mine, the code will fail.
        - Many people, therefore, argue for keeping feature branches short—perhaps just a couple of days. Others, such as me, want them even shorter than that. This is an approach called Continuous Integration (CI), also
        known as Trunk­Based Development. With CI, each team member integrates with mainline at least once per day. This prevents any branches diverting too far from each other and thus greatly reduces the complexity of merges
        - I’m not saying that you should never use feature branches. If they are sufficiently short, their problems are much reduced. (Indeed, users of CI usually also use branches, but integrate them with mainline each day.)

- **Testing**
    - One of the key characteristics of refactoring is that it doesn’t change the observable behavior of the program
    - Mistakes happen, but they aren’t a problem provided I catch them quickly. Since each refactoring is a small change, if I break anything, I only have a small change to look at to find the fault—and if I still can’t spot it, I can revert my version control to the last working version.
    - The key here is being able to catch an error quickly. To do this, realistically, I need to be able to run a comprehensive test suite on the code—and run it quickly, so that I’m not deterred from running it frequently
    - This also answers those who are concerned that refactoring carries too much risk of introducing bugs. Without self­testing code, that’s a reasonable worry—which is why I put so much emphasis on having solid tests.
    - Even when I do have tests, I don’t advocate trying to refactor a complicated legacy mess into beautiful code all at once. What I prefer to do is tackle it in relevant pieces. Each time I pass through a section of the code, I try to make it a little bit better—again, like leaving a camp site cleaner than when I found it.

- **Databases**
    - Consider a simple example of renaming a field (column). As in Change Function Declaration (124), I need to find the original declaration of the structure and all the
    callers of this structure and change them in a single change. The complication, however, is that I also have to transform any data that uses the old field to use the new one. I write a small hunk of code that carries out this transform and store it in version control, together with the code that changes any declared structure and access routines. Then, whenever I need to migrate between two versions of the database, I run all the migration scripts that exist between my current copy of the database and my desired version.
    - when renaming a field, my first commit would add the new database field but not use it. I may then set up the updates so they update both old and new fields at once. I can then gradually move the readers over to the new field.

**REFACTORING, ARCHITECTURE, AND YAGNI**
- Early in my career, I was taught that software design and architecture was something to be worked on, and mostly completed, before anyone started writing code. Once the code was written, its architecture was fixed and could only decay due to carelessness.
- Refactoring changes this perspective. It allows me to significantly alter the architecture of software that’s been running in production for years. Refactoring can improve the design of existing code. But as I indicated earlier, changing legacy code is often challenging, especially when it lacks decent tests.
- With refactoring, I can use a different strategy. Instead of speculating on what flexibility I will need in the future and what mechanisms will best enable that, I build software that solves only the currently understood needs, but I make this software excellently designed for those needs
- I use refactoring to adapt the architecture to those new demands. I can happily include mechanisms that don’t increase complexity (such as small, well­named functions) but any flexibility that complicates the software has to prove itself before I include it
- Yagni doesn’t imply that architectural thinking disappears, although it is sometimes naively applied that way. I think of yagni as a different style of incorporating architecture and design into the development process—a style that isn’t credible without the foundation of refactoring
- Adopting yagni doesn’t mean I neglect all upfront architectural thinking. There are still cases where refactoring changes are difficult and some preparatory thinking can save time. But the balance has shifted a long way—I’m much more inclined to deal with
issues later when I understand them better. A

**REFACTORING AND THE WIDER SOFTWARE DEVELOPMENT PROCESS**
- The first foundation for refactoring is self­testing code. By this, I mean that there is a suite of automated tests that I can run and be confident that, if I made an error in my programming, some test will fail.
- To refactor on a team, it’s important that each member can refactor when they need to without interfering with others’ work. This is why I encourage Continuous Integration.
- Refactoring and yagni positively reinforce each other: Not just is refactoring (and its prerequisites) a foundation for yagni—yagni makes it easier to do refactoring. This is because it’s easier to change a simple system than one that has lots of speculative flexibility included.

**REFACTORING AND PERFORMANCE**
- A common concern with refactoring is the effect it has on the performance of a program. To make the software easier to understand, I often make changes that will cause the program to run slower.
- Refactoring can certainly make software go more slowly—but it also makes the software more amenable to performance tuning. The secret to fast software, in all but hard real­time contexts, is to write tunable software first and then tune it for sufficient speed.
- I’ve found that refactoring helps me write fast software. It slows the software in the short term while I’m refactoring, but makes it easier to tune during optimization. I end up well ahead.


**Chapter 3 - Bad Smells in Code**

*TIP: “If it stinks, change it.” — Grandma Beck, discussing child­rearing philosophy*<br />
Just because you know how doesn’t mean you know when. Deciding when to start refactoring—and when to stop—is just as important to refactoring as knowing how to operate the mechanics of it.

**MYSTERIOUS NAME**
- One of the most important parts of clear code is good names, so we put a lot of thought into naming functions, modules, variables, classes, so they clearly communicate what they do and how to use them.
- Most common refactorings we do are the renames: Change Function Declaration (124) (to rename a function), Rename Variable (137), and Rename Field (244)
- a good name can save hours of puzzled incomprehension in the future.

**DUPLICATED CODE**
- If you see the same code structure in more than one place, you can be sure that your program will be better if you find a way to unify them.
- The simplest duplicated code problem is when you have the same expression in two methods of the same class
- If you have code that’s similar, but not quite identical, see if you can use Slide Statements (223) to arrange the code so the similar items are all together for easy extraction. If the duplicate fragments are in subclasses of a common
base class, you can use Pull Up Method (350) to avoid calling one from another.

**LONG FUNCTION**
- the programs that live best and longest are those with short functions.
- the longer a function is, the more difficult it is to understand
- the real key to making it easy to understand small functions is good naming. If you have a good name for a function, you mostly don’t need to look at its body.
- A heuristic we follow is that whenever we feel the need to comment something, we write a function instead. Such a function contains the code that we wanted to comment but is named after the intention of the code rather than the way it works.
- Ninety­nine percent of the time, all you have to do to shorten a function is Extract Function (106). Find parts of the function that seem to go nicely together and make a new one.
- How do you identify the clumps of code to extract?
    - A good technique is to look for comments. They often signal this kind of semantic distance. A block of code with a comment that tells you what it is doing can be replaced by a method whose name is based on the comment.
    - Conditionals and loops also give signs for extractions. Use Decompose Conditional (260) to deal with conditional expressions. A big switch statement should have its legs turned into single function calls with Extract Function (106). If there’s more than one switch statement switching on the same condition, you should apply Replace Conditional with Polymorphism (272).

**LONG PARAMETER LIST**
- But long parameter lists are often confusing in their own right
- If you can obtain one parameter by asking another parameter for it, you can use Replace Parameter with Query (324) to remove the second parameter. Rather than pulling lots of data out of an existing data structure, you can use Preserve Whole Object (319) to pass the original data structure instead. If several parameters always fit together, combine them with Introduce Parameter Object (140). If a parameter is used as a flag to dispatch different behavior, use Remove Flag Argument (314).
- Classes are a great way to reduce parameter list sizes. They are particularly useful when multiple functions share several parameter values. Then, you can use Combine Functions into Class (144) to capture those common values as fields.


**GLOBAL DATA**
- The problem with global data is that it can be modified from anywhere in the code base, and there’s no mechanism to discover which bit of code touched it
- The most obvious form of global data is global variables, but we also see this problem with class variables and singletons.
- Our key defense here is Encapsulate Variable (132), which is always our first move when confronted with data that is open to contamination by any part of a program. At least when you have it wrapped by a function, you can start seeing where it’s modified and start to control its access.
- it’s good to limit its scope as much as possible by moving it within a class or module where only that module’s code can see it.
- Global data is especially nasty when it’s mutable. Global data that you can guarantee never changes after the program starts is relatively safe—if you have a language that can enforce that guarantee.

**MUTABLE DATA**
- Changes to data can often lead to unexpected consequences and tricky bugs. I can update some data here, not realizing that another part of the software expects something different and now fails—a failure that’s particularly hard to spot if it only happens under rare conditions.
- But this doesn’t mean we should ignore the advantages of immutability—there are still many things we can do to limit the risks on unrestricted data updates.
- You can use Encapsulate Variable (132) to ensure that all updates occur through narrow functions that can be easier to monitor and evolve. If a variable is being updated
to store different things, use Split Variable (240) both to keep them separate and avoid the risky update. Try as much as possible to move logic out of code that processes the update by using Slide Statements (223) and Extract Function (106) to separate the side­effect­free code from anything that performs the update.
- Mutable data isn’t a big problem when it’s a variable whose scope is just a couple of lines—but its risk increases as its scope grows.


**DIVERGENT CHANGE**
- We structure our software to make change easier; after all, software is meant to be soft.
- When we make a change, we want to be able to jump to a single clear point in the system and make the change.
- If you look at a module and say, “Well, I will have to change these three functions every time I get a new database; I have to change these four functions every time there is a new financial instrument,” this is an indication of divergent change.

**SHOTGUN SURGERY**
- Shotgun surgery is similar to divergent change but is the opposite.
- You whiff this when, every time you make a change, you have to make a lot of little edits to a lot of different classes.


**FEATURE ENVY**
- When we modularize a program, we are trying to separate the code into zones to maximize the interaction inside a zone and minimize interaction between zones.
- A classic case of Feature Envy occurs when a function in one module spends more time communicating with functions or data inside another module than it does within its own module.
- Fortunately, the cure for that case is obvious: The function clearly wants to be with the data, so use Move Function (198) to get it there. Sometimes, only a part of a function suffers from envy, in which case use Extract Function (106) on the jealous bit, and Move Function (198) to give it a
dream home

**DATA CLUMPS**
- Data items tend to be like children: They enjoy hanging around together. Often, you’ll see the same three or four data items together in lots of places: as fields in a couple of classes, as parameters in many method signatures. B
- Use Extract Class (182) on the fields to turn the clumps into an object. Then turn your attention to method signatures using Introduce Parameter Object (140) or Preserve Whole Object (319) to slim them down. The immediate benefit is that you can shrink a lot of parameter lists and simplify method calling.


**PRIMITIVE OBSESSION**
<br/>We find many programmers are curiously reluctant to create their own fundamental types which are useful for their domain—such as money, coordinates, or ranges. Strings are particularly common petri dishes for this kind of odor: A telephone number is more than just a collection of characters. If nothing else, a proper type can often include consistent display logic for when it needs to be displayed in a user interface. Representing such types as strings is such a common stench that people call them “stringly typed” variables.
- You can move out of the primitive cave into the centrally heated world of meaningful types by using Replace Primitive with Object (174). If the primitive is a type code controlling conditional behavior, use Replace Type Code with Subclasses (362) followed by Replace Conditional with Polymorphism (272).
- Groups of primitives that commonly appear together are data clumps and should be civilized with Extract Class (182) and Introduce Parameter Object (140).

**REPEATED SWITCHES**
- Talk to a true object­oriented evangelist and they’ll soon get onto the evils of switch statements. They’ll argue that any switch statement you see is begging for Replace Conditional with Polymorphism (272). We’ve even heard some people argue that all conditional logic should be replaced with polymorphism, tossing most ifs into the dustbin of history.
- The problem with such duplicate switches is that, whenever you add a clause, you have to find all the switches and update them. Against the dark forces of such repetition, polymorphism provides an elegant weapon for a more civilized codebase.

**LOOPS**
- These days, however, first­class functions are widely supported, so we can use Replace Loop with Pipeline (231) to retire those anachronisms. We find that pipeline operations, such as filter and map, help us quickly see the elements that are included in the processing and what is done with them.

**LAZY ELEMENT**
- We like using program elements to add structure—providing opportunities for variation, reuse, or just having more helpful names. But sometimes the structure isn’t needed.
- Sometimes, this reflects a function that was expected to grow and be popular later, but never realized its dreams. Sometimes, it’s a class that used to pay its way, but has been downsized with refactoring.
- Sometimes, this reflects a function that was expected to grow and be popular later, but never realized its dreams. Sometimes, it’s a class that used to pay its way, but has been downsized with refactoring.

**SPECULATIVE GENERALITY**
- You get it when people say, “Oh, I think we’ll need the ability to do this kind of thing someday” and thus add all sorts of hooks and special cases to handle things that aren’t required. The result is often harder to understand and maintain. If all this machinery were being used, it would be worth it. But if it isn’t, it isn’t. The machinery just gets in the way, so get rid of it.
- If you have abstract classes that aren’t doing much, use Collapse Hierarchy (380). Unnecessary delegation can be removed with Inline Function (115) and Inline Class (186). Functions with unused parameters should be subject to Change Function Declaration (124) to remove those parameters. You should also apply Change Function
Declaration (124) to remove any unneeded parameters, which often get tossed in for future variations that never come to pass.


**TEMPORARY FIELD**
- Sometimes you see a class in which a field is set only in certain circumstances. Such code is difficult to understand, because you expect an object to need all of its fields. Trying to understand why a field is there when it doesn’t seem to be used can drive you nuts.
- Use Extract Class (182) to create a home for the poor orphan variables. Use Move Function (198) to put all the code that concerns the fields into this new class. You may also be able to eliminate conditional code by using Introduce Special Case (289) to create an alternative class for when the variables aren’t valid.

**MESSAGE CHAINS**
- You see message chains when a client asks one object for another object, which the client then asks for yet another object, which the client then asks for yet another another object, and so on. You may see these as a long line of getThis methods, or as a sequence of temps. Any change to the intermediate relationships causes the client to have to change.
- The move to use here is Hide Delegate (189). You can do this at various points in the chain.In principle, you can do this to every object in the chain, but doing this often turns every intermediate object into a middle man.
- Often, a better alternative is to see what the resulting object is used for. See whether you can use Extract Function (106) to take a piece of the code that uses it and then Move Function (198) to push it down the chain.


**MIDDLE MAN**
- Encapsulation often comes with delegation. You ask a director whether she is free for a meeting; she delegates the message to her diary and gives you an answer. All well and good. There is no need to know whether the director uses a diary, an electronic gizmo, or a secretary to keep track of her appointments.
- Encapsulation often comes with delegation. You ask a director whether she is free for a meeting; she delegates the message to her diary and gives you an answer. All well and good. There is no need to know whether the director uses a diary, an electronic gizmo, or a secretary to keep track of her appointments.

**INSIDER TRADING**
- Software people like strong walls between their modules and complain bitterly about how trading data around too much increases coupling. To make things work, some trade has to occur, but we need to reduce it to a minimum and keep it all above board.
- Modules that whisper to each other by the coffee machine need to be separated by using Move Function (198) and Move Field (207) to reduce the need to chat. If modules have common interests, try to create a third module to keep that commonality in a well­ regulated vehicle, or use Hide Delegate (189) to make another module act as an intermediary.
- Inheritance can often lead to collusion. Subclasses are always going to know more about their parents than their parents would like them to know. If it’s time to leave home, apply Replace Subclass with Delegate (381) or Replace Superclass with Delegate (399).

**LARGE CLASS**
- When a class is trying to do too much, it often shows up as too many fields. When a class has too many fields, duplicated code cannot be far behind.
- You can Extract Class (182) to bundle a number of the variables. Choose variables to go together in the component that makes sense for each. For example, “depositAmount” and “depositCurrency” are likely to belong together in a component. More generally, common prefixes or suffixes for some subset of the variables in a class suggest the opportunity for a component.
- If the component makes sense with inheritance, you’ll
find Extract Superclass (375) or Replace Type Code with Subclasses (362) (which essentially is extracting a subclass) are often easier.

**DATA CLASS**
- These are classes that have fields, getting and setting methods for the fields, and nothing else. Such classes are dumb data holders and are often being manipulated in far too much detail by other classes.
- In some stages, these classes may have public fields. If so, you should immediately apply Encapsulate Record (162) before anyone notices. Use Remove Setting Method (331) on any field that should not be changed.
- Look for where these getting and setting methods are used by other classes. Try to use Move Function (198) to move behavior into the data class. If you can’t move a whole function, use Extract Function (106) to create a function that can be moved.

**REFUSED BEQUEST**
- Subclasses get to inherit the methods and data of their parents. But what if they don’t want or need what they are given? They are given all these great gifts and pick just a few to play with.
- The traditional story is that this means the hierarchy is wrong. You need to create a new sibling class and use Push Down Method (359) and Push Down Field (361) to push all the unused code to the sibling. That way the parent holds only what is common. Often, you’ll hear advice that all superclasses should be abstract.
- You’ll guess from our snide use of “traditional” that we aren’t going to advise this—at least not all the time. We do subclassing to reuse a bit of behavior all the time, and we find it a perfectly good way of doing business. There is a smell—we can’t deny it—but usually it isn’t a strong smell. So, we say that if the refused bequest is causing confusion and problems, follow the traditional advice. However, don’t feel you have to do it all the time. Nine times out of ten this smell is too faint to be worth cleaning.

**COMMENTS**
- Don’t worry, we aren’t saying that people shouldn’t write comments. In our olfac­tory analogy, comments aren’t a bad smell; indeed they are a sweet smell. The reason we mention comments here is that comments are often used as a deodorant. It’s surprising how often you look at thickly commented code and notice that the comments are there because the code is bad.
- If you need a comment to explain what a block of code does, try Extract Function (106). If the method is already extracted but you still need a comment to explain what it does, use Change Function Declaration (124) to rename it. If you need to state some rules about the required state of the system, use Introduce Assertion (302).
- *TIP: When you feel the need to write a comment, first try to refactor the code so that any comment becomes superfluous.*
- A good time to use a comment is when you don’t know what to do. In addition to describing what is going on, comments can indicate areas in which you aren’t sure. A comment can also explain why you did something. This kind of information helps future modifiers, especially forgetful ones.



**Chapter 4 - Building Tests**
- Refactoring is a valuable tool, but it can’t come alone. To do refactoring properly, I need a solid suite of tests to spot my inevitable mistakes.
- Make sure all tests are fully automatic and that they check their own results.
- A suite of tests is a powerful bug detector that decapitates the time it takes to find bugs.
- Always make sure a test will fail when it should.
    - A way of doing that is to temporarily inject a fault into the code.
- Run tests frequently. Run those exercising the code you’re working on at least every few minutes; run all tests at least daily.
- It is better to write and run incomplete tests than not to run complete tests.
- This is a common pattern. I take the initial standard fixture that’s set up by the beforeEach block, I exercise that fixture for the test, then I verify the fixture has done what I think it should have done.
    - setup-­exercise-verify
    - given­-when-­then
    - arrange-­act­-assert
- Think of the boundary conditions under which things might go wrong and concentrate your tests there.
    - Play the part of an enemy to your code. Think about how you can break it.
    - Be both productive and fun.
- Don’t let the fear that testing can’t catch all bugs stop you from writing tests that catch most bugs. 
    - I’m sure you have heard many times that you cannot prove that a program has no bugs by testing. That’s true, but it does not affect the ability of testing to speed up programming.
- When you get a bug report, start by writing a unit test that exposes the bug.
- How much testing is enough?”
    - The best measure for a good enough test suite is subjective: How confident are you that if someone introduces a defect into the code, some test will fail? This isn’t something that can be objectively analyzed, and it doesn’t account for false confidence, but the aim of self­testing code is to get that confidence. If I can refactor my code and be pretty sure that I’ve not introduced a bug because my tests come back green—then I can be happy that I have good enough tests.


**Chapter 5 - Introducing the Catalog**

**Chapter 6 - A First Set of Refactorings**
**EXTRACT FUNCTION**
- Inverse of: Inline Function

- Motivation: 
    - look at a fragment of code, understand what it is doing, then extract it into its own function named after its purpose.
    -  If you have to spend effort looking at a fragment of code and figuring out what it’s doing, then you should extract it into a function and name the function after the “what.” Then, when you read it again, the purpose of the function leaps right out at you, and most of the time you won’t need to care about how the function fulfills its purpose (which is the body of the function).
    -  Any function with more than half­a­dozen lines of code starts to smell, and it’s not unusual for me to have functions that are a single line of code.
    - Small functions  work if the names are good, so you need to pay good attention to naming. 
    - Often, fragments of code in a larger function that start with a comment to say what they do. The comment is often a good hint for the name of the function when I extract that fragment.

- Mechanics:
    - Create a new function, and name it after the intent of the function (name it by what it does, not by how it does it)
        - If I can’t come up with a more meaningful name, that’s a sign that I shouldn’t extract the code
        - I don’t have to come up with the best name right away; sometimes a good name only appears as I work with the extraction.
        - If the language supports nested functions, nest the extracted function inside the source function. That will reduce the amount of out­of­scope variables to deal with after the next couple of steps.
    - Copy the extracted code from the source function into the new target function.
    - Scan the extracted code for references to any variables that are local in scope to the source function and will not be in scope for the extracted function. Pass them as parameters.
        - If a variable is only used inside the extracted code but is declared outside, move the declaration into the extracted code
        - Any variables that are assigned to need more care if they are passed by value. If there’s only one of them, I try to treat the extracted code as a query and assign the result to the variable concerned.
        - Sometimes, I find that too many local variables are being assigned by the extracted code. It’s better to abandon the extraction at this point. When this happens, I consider other refactorings such as Split Variable (240) or Replace Temp with Query (178) to simplify variable usage and revisit the extraction later
    - Compile after all variables are dealt with.
    - Replace the extracted code in the source function with a call to the target function.
    - Look for other code that’s the same or similar to the code just extracted, and consider using Replace Inline Code with Function Call (222) to call the new function.

- Sample Code Before:
```
function printOwing(invoice) {
  printBanner();
  let outstanding = calculateOutstanding();
  // Print details
  console.log(`name: ${invoice.customer}`);
  console.log(`amount: ${outstanding}`);
}
```
- Sample Code After:
```
function printOwing(invoice) {
  printBanner();
  let outstanding = calculateOutstanding();
  printDetails(outstanding);

  function printDetails(outstanding){
    console.log(`name: ${invoice.customer}`);
    console.log(`amount: ${outstanding}`);
  }
}
```

**INLINE FUNCTION**
- Inverse of: Extract Function

- Motivation: 
    - the body is as clear as the name. Or, I refactor the body of the code into something that is just as clear as the name. When this happens, I get rid of the function.
    - when I see code that’s using too much indirection— when it seems that every function does simple delegation to another function, and I get lost in all the delegation

- Mechanics:
    - Check that this isn’t a polymorphic method. If this is a method in a class, and has subclasses that override it, then I can’t inline it.
    - Find all the callers of the function.
    - Replace each call with the function’s body.
    - Test after each replacement.
        - The entire inlining doesn’t have to be done all at once. If some parts of the inline are tricky, they can be done gradually as opportunity permits.
    - Remove the function definition.

- Sample Code Before:
```
function getRating(driver) {
  return moreThanFiveLateDeliveries(driver) ? 2 : 1;
}

function moreThanFiveLateDeliveries(driver) {
  return driver.numberOfLateDeliveries > 5;
}

```

- Sample Code After:
```
function getRating(driver) {
  return (driver.numberOfLateDeliveries > 5) ? 2 : 1;
}
```

**EXTRACT VARIABLE**
- Inverse of: Inline Variable

- Motivation: 
    - Expressions can become very complex and hard to read. In such situations, local variables may help break the expression down into something more manageable. In particular, they give me an ability to name a part of a more complex piece of logic. This allows me to better understand the purpose of what’s happening
- Mechanics:
    - Ensure that the expression you want to extract does not have side effects.
    - Declare an immutable variable. Set it to a copy of the expression you want to name.
    - Replace the original expression with the new variable.
    - Test.
- Sample Code Before:
```
return order.quantity * order.itemPrice -
  Math.max(0, order.quantity - 500) * order.itemPrice * 0.05 +
  Math.min(order.quantity * order.itemPrice * 0.1, 100);

```

- Sample Code After:
```
const basePrice = order.quantity * order.itemPrice;
const quantityDiscount = Math.max(0, order.quantity - 500) * order.itemPrice * 0.05;
const shipping = Math.min(basePrice * 0.1, 100);

return basePrice + quantityDiscount + shipping;

```

**INLINE VARIABLE**
- Inverse of: Extract Variable

- Motivation: 
    - Variables provide names for expressions within a function, and as such they are usually a Good Thing. But sometimes, the name doesn’t really communicate more than the expression itself.

- Mechanics:
    - Check that the right­hand side of the assignment is free of side effects.
    - If the variable isn’t already declared immutable, do so and test.
    - Find the first reference to the variable and replace it with the right­hand side of the assignment.
    - Test.
    - Repeat replacing references to the variable until you’ve replaced all of them.
    - Remove the declaration and assignment of the variable.
    - Test.

- Sample Code Before:
``` 
let basePrice = anOrder.basePrice;
return (basePrice > 1000)
```

- Sample Code After:
```
return anOrder.baasePrice > 1000;
```

**CHANGE FUNCTION DECLARATION**
- Inverse of: 

- Motivation: 
    - Function declarations represent how these parts fit together—effectively, they represent the joints in our software systems.
    - Good joints allow me to add new parts to the system easily, but bad ones are a constant source of difficulty, making it harder to figure out what the software does and how to modify it as my needs change.
    - A good name allows me to understand what the function does when I see it called, without seeing the code that defines its implementation.
    - If I see a function with the wrong name, it is imperative that I change it as soon as I understand what a better name could be. That way, the next time I’m looking at this code, I don’t have to figure out again what’s going on.

- Mechanics:
    - If you’re removing a parameter, ensure it isn’t referenced in the body of the function
    - Change the method declaration to the desired declaration.
    - Find all references to the old method declaration, update them to the new one
    - Test

- Sample Code Before:
```
function circum(radius) 
{ 
    return circumference(radius); 
}

addReservation(customer) 
{ 
    this.zz_addReservation(customer, false); 
}
```

- Sample Code After:
```
function circumference(radius) 
{ 
    return 2 * Math.PI * radius; 
}

zz_addReservation(customer, isPriority) 
{ 
    this._reservations.push(customer); 
}
```












- Inverse of: 

- Motivation: 

- Mechanics:

- Sample Code Before:
```
```

- Sample Code After:
```
```
