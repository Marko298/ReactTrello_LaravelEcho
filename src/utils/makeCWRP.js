export default (this1, propsList) => {
    function make(nextProps) {
        const toUpdate = {};
        for (const prop in propsList) {
            if (propsList.hasOwnProperty(prop)) {
                if (nextProps[prop] !== this.state[propsList[prop]]) {
                    toUpdate[propsList[prop]] = nextProps[prop];
                }
            }
        }

        this.setState({...toUpdate});
    }

    return make.bind(this1);
}