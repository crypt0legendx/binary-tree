
class Actions {

    // The number of nodes above which the user will be warned before running
    // "Fill" or "Quick Fill"
    static NODELIMIT = 500;

    constructor(tree) {
        this.tree = tree;
        this.tree.bindControls(this);  // Provide the tree a reference to this class

        this.animationInterval = null; // Property Tree class relies on for animation

        // Set the animation interval based on the slider's value
        this.setAnimationSpeed();


        document.addEventListener('keydown',(e)=>{
            if(e.which==32){
               var x = Math.random();
               this.triggerAnimation(this.add)
            }
        })

        document.addEventListener('mousedown',(e)=>{
            if(e.which==1){
                var searchRslt=this.searchPos(e.x,e.y);
                if(searchRslt!=null){
                    if (confirm('Confirm to delete node that the value is '+searchRslt) == true) {
                      this.delete(searchRslt);
                    }
                }
            }
        })
    }

    // Completly resets the tree, removing all nodes, stopping all animations
    clear() {
        this.tree.clear();
        this.tree.stopAnimation(() => {})
        this.tree.draw();
    }

    // Called by event listeners to run a certain animation if one is not running
    triggerAnimation(animation) {
        if(this.tree.running) {
            alert('Please wait for the current animation to finish');
        } else {
            // Bind the animation here so it doesn't have to be bound as an argument
            animation.bind(this)();
        }
    }

    // Prompts the user with a given piece of text
    // Returns: null               => if no valid number was entered
    //          postive integer    => if a valid positive integer is provided
    getNumber(text) {
        var value = Math.floor(Math.random()*200) - 100

        if(value === null) {
            return null;
        } else if(isNaN(parseInt(value)) || value === "") {
            alert('Please enter a positive integer');
            return null;
        } else {
            return parseInt(value);
        }
    }

    // Method for the Quick Fill animation
    quickFill() {
        var count = this.getNumber("Number of nodes: ");

        if(count !== null && (count < Actions.NODELIMIT ||
                confirm(count + ' nodes may reduce performance. Continue anyways?'))) {
            this.tree.fill(count);
        }
    }

    // Method for the Fill animation
    slowFill() {
        var count = this.getNumber("Number of nodes: ");

        if(count !== null && (count < Actions.NODELIMIT ||
                confirm(count + ' nodes may reduce performance. Continue anyways?'))) {
            this.tree.fillVisual(count);
        }
    }

    // Method for the Add animation
    add() {
        var value = this.getNumber("Value to add: ");

        if(value !== null && this.tree.search(value)) {
            this.add();
        } else if(value !== null){
            this.tree.addValueVisual(value);
        }

    }

    delete(val) {
       this.tree.deleteValueVisual(val);
    }


    searchPos(x,y){
        if(this.tree.running) {
            alert('Please wait for the current animation to finish');
        } else {
            var rslt=this.tree.searchPos(x,y);
            return rslt;
        }
    }

    // Method for the search animation
    search() {
        var value = this.getNumber("Value to search for: ");

        if(value !== null) {
            this.tree.searchVisual(value)
        }
    }

    // Inverts and exponentiates the linear output of the slider to set the interval
    setAnimationSpeed() {
        this.animationInterval= 100;
    }
}
