import {actions} from './actions'



const saveToLocalStorage = object =>{
    localStorage.setItem("items",JSON.stringify(object))
}
//définir un état initial
const initialState = {
    items: JSON.parse(localStorage.getItem("items")) !== null ? JSON.parse(localStorage.getItem("items")):[]
}

/* La méthode Object.assign(cible, ...sources) est utilisée afin de copier les valeurs de toutes les propriétés directes (non héritées) 
d'un objet qui sont énumérables sur un autre objet cible. 
Cette méthode renvoie l'objet cible. */ 

export default function onlineStoreApp(state = initialState,action) {
    switch(action.type){
        case actions.ADD_TO_CART : return Object.assign({}, state, { items : [...state.items, action.payload]});
        case actions.UPADTE_CART : return Object.assign({},state,{
            //map : est ue fonction itératif avec une condition l'item qui souhaite identifié pour ensuite modifier
            items : state.items.map(item =>{ 
                return item.id === action.payload.id ?
                Object.assign({},item,{
                    quantity:action.payload.quantity
                }) :item;//le cas échéant
            })
        })
        //assign : avoir copie de state
        case actions.REMOVE_FROM_CART :return Object.assign({},state,{
            items: state.items.filter(item =>{
                return item.id != action.payload
            })
        })

        case actions.SAVE_CART: 
            saveToLocalStorage(action.payload.items)
            return state

        case actions.RESET_CART:
            saveToLocalStorage([])
            return Object.assign({},state,{
                    items:[]
            }) 
            
        default : return state // sera également à un tableau vide
    }
    
}