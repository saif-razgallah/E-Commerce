import React from 'react'
import { List, SideMenu } from '../../components'



export const Home = props => {
    const{isFiltering,filterRed,list,category,loadCategory,updateCart} = props
    return (
        <div className="container"> {/*créer la mise en page qui sera responsive*/}
            <div className="row">
                <SideMenu loadCategory={loadCategory} category={category} />
                <div className="col-sm">
                    <div className="row">
                        <List data={isFiltering ? filterRed : list[category]} category={category}  updateCart={updateCart} />
                    </div>
                </div>
            </div>
        </div>)
}