import React from 'react'

interface CheckBox {
    checked: boolean,
    updateTreeView: Function,
    nodeId: string
}

export default class ClickToEditCheck extends React.Component <CheckBox,{isEditMode: boolean}>{
    private checkboxRef = React.createRef<HTMLInputElement>()

    constructor(props : any){
        super(props)
        this.state = {isEditMode: false}
    }

    private handleCheckboxChange(){
        this.setState({isEditMode: false})
        const node = this.checkboxRef.current
        if (node){
            this.props.updateTreeView(this.props.nodeId, node.checked, 'CHECK')
        }
    }

    private handleDoubleClick(){
        this.setState({isEditMode: true})
    }

    render(){
        const { isEditMode } = this.state
        return (
            <span>
                {isEditMode ? 
                    (<input
                        ref={this.checkboxRef}
                        type="checkbox"
                        onChange={this.handleCheckboxChange.bind(this)}
                        checked={this.props.checked}
                    />)
                    :
                    (<span onDoubleClick={this.handleDoubleClick.bind(this)}>
                        {this.props.checked.toString()}
                    </span>)
                        
                }
            </span>
        )
    }
}