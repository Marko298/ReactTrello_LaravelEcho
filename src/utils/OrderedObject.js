export default class OrderedObject {


    getByKey = (key) => {
        return this.object[key];
    };
    getByIndex = (index) => {
        return this.object[this.array[index]]
    };
    values = () => {
        return this.array.map((key) => (
            this.object[key]
        ))
    };
    deleteByIndex = (index) => {
        this.array = this.array.slice();
        const [key] = this.array.splice(index, 1);

        this.object = Object.assign({}, this.object);
        delete this.object[key];

        return this
    };
    map = (fn) => {
        return this.values().map(fn)
    };

    constructor(object = null, array = null) {
        this.object = object;
        this.array = array ? array : Object.keys(object);
    }
}