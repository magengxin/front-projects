
class User {
    constructor(name, password) {
        this.name = name;
        this.password = password;
    }

    showname() {
        console.log(this.name);
    }

    showpass() {
        console.log(this.password);
    }
}

class Xiaoming extends User {
    constructor(name,password,level){
        super(name,password)
        this.level=level
    }
    showlevel(){
        console.log(this.level);
    }
}
let xiaoming = new Xiaoming('xiao',123456,100)
xiaoming.showname()
xiaoming.showpass()
xiaoming.showlevel()