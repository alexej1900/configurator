const initState = {style: 0, image: '', title: ''};

const apartStyle = (state = initState, action) => {
    switch(action.type) {
        case 'CHANGE_STYLE': 
            return state = {style: action.payload, image: action.image, title: action.title}
        case 'SET_INIT_STATE': 
            return state = {...action.apartStyle}
        case 'RESET_STATE': 
            return state = initState;
        default: 
            return state;
    }
}

export default apartStyle;
