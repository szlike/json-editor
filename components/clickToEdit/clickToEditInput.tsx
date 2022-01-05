import React from 'react'
import { Button, Input} from '@material-ui/core'


interface ClickToInput {
    value: string | number,
    updateTreeView: Function,
    nodeId: string
}

export default class ClickToEditInput extends React.Component <ClickToInput, {isEditMode: boolean, onError: boolean}>{
    private inputRef = React.createRef<HTMLInputElement>()

    constructor(props : any){
        super(props)
        this.state = {isEditMode: false, onError: false}
    }

    handleDoubleClick(){
        this.setState({isEditMode: true})
    }

    handleClickEnter(){
        
        const node = this.inputRef.current
        if (node && node.querySelector('input')?.value){
            this.props.updateTreeView(this.props.nodeId, node.querySelector('input')?.value, 'EDIT')
            this.setState({isEditMode: false, onError: false})
        } else {
            this.setState({isEditMode: true, onError: true})
        }
    }

    handleClickCancel(){
        this.setState({isEditMode: false})
    }

    // handleClickDelete(){
    //     this.setState({isEditMode: false})
    //     this.props.updateTreeView(this.props.nodeId, this.inputBox.current.value, 'DELETE')
    // }

    render(){
        const { isEditMode, onError} = this.state
        return isEditMode ?
            (<span>
                <Input ref={this.inputRef} error={onError} id="component-simple" defaultValue={this.props.value} />
                &nbsp;
                <Button variant="contained" onClick={this.handleClickEnter.bind(this)} size="small">Enter</Button>
                &nbsp;
                <Button variant="contained" onClick={this.handleClickCancel.bind(this)} size="small">Cancel</Button>
                {/* <button onClick={this.handleClickDelete.bind(this)}>Delete</button> */}
            </span>)
            : (<span onDoubleClick={this.handleDoubleClick.bind(this)}>
                {this.props.value}
            </span>)
    }
}