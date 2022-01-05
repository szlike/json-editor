import React from 'react';
import { withStyles } from '@material-ui/core/styles'
import { TreeView, TreeItem } from '@material-ui/lab'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ClickToEditInput from './clickToEdit/clickToEditInput'
import ClickToEditCheck from './clickToEdit/clickToEditCheck'
import { UpdateTreeViewAction } from '../constants'
import * as _ from "lodash"

const styles = {
	root: {
		top: '10vh',
		bottom: '5vh',
		height: 240,
		flexGrow: 1,
		minWidth: 400
	},
	editField: {
		margin: '0 0 0 6px'
	}
}

interface JsonEditorState {
	expanded: string[],
	selected:string[],
	data: object
}

class JsonEditor extends React.Component<{classes:any, data: JSON}, JsonEditorState> {

	constructor(props:any){
		super(props)
		this.state = {
			expanded: [],
			selected: [],
			data: this.props.data
		}
	}

	private handleToggle(event: React.ChangeEvent<{}>, nodeIds: string[]) {
		this.setState({expanded: nodeIds})
	}

	private handleSelect(event: React.ChangeEvent<{}>, nodeIds: string[]) {
		this.setState({selected: nodeIds})
	}

	private generateNewNodeId(nodeId:string, identifer: string, addLevel: boolean) {
		if (addLevel){
			return `${nodeId}.${identifer}`
		} else {
			return `${nodeId}${identifer}`
		}
	}

	private convertJsonToTreeItem(jsonObj: any, nodeId:string) : any {
		const {classes} = this.props
		if (Array.isArray(jsonObj)){
			return jsonObj.map((item, index)=>{
				return (<TreeItem key={nodeId} nodeId={`${nodeId}${index}`} label={index}>
				{this.convertJsonToTreeItem(item, this.generateNewNodeId(nodeId, `[${index}]`, false))}
				</TreeItem>)
			})
		} else if (typeof jsonObj === 'object'){
			return Object.keys(jsonObj).map((key, index)=>{
				const value = jsonObj[key]
				
				if (( typeof value === 'number' || typeof value === 'string')){
					return (
						<div className={classes.editField}>
							{key}: <ClickToEditInput nodeId={this.generateNewNodeId(nodeId, key, true)} value={value} updateTreeView={this.updateTreeView.bind(this)}/>
						</div>)
				} else if (typeof value === 'boolean'){
					return (
						<div className={classes.editField}>
							{key}: <ClickToEditCheck
										nodeId={this.generateNewNodeId(nodeId, key, true)}
										checked={value} 
										updateTreeView={this.updateTreeView.bind(this)}
									/>
						</div>)
				} else {
					return (
						<TreeItem key={nodeId} nodeId={nodeId} label={key}>
							{this.convertJsonToTreeItem(jsonObj[key], this.generateNewNodeId(nodeId, key, true))}
						</TreeItem>
					)
				}
			})
		}
	}

	private updateTreeView(nodeId: string, value: any, action:string){
		switch(action){
			case UpdateTreeViewAction.DELETE:
				let deleteData = this.state.data
				this.setState({data:_.omit(deleteData, nodeId)})
				break
			case UpdateTreeViewAction.EDIT:
				let editData = this.state.data
				_.update(editData, nodeId, ()=>value)
				this.setState({data: editData})
				break
			case UpdateTreeViewAction.CHECK:
				let checkData = this.state.data
				_.update(checkData, nodeId, ()=>value)
				this.setState({data: checkData})
				break
					
		}
	}

	get convertJsonToTreeView() : JSX.Element {
		const {classes} = this.props
		return (
			<TreeView
				className={classes.root}
				defaultCollapseIcon={<ExpandMoreIcon />}
				defaultExpandIcon={<ChevronRightIcon />}
				expanded={this.state.expanded}
				selected={this.state.selected}
				onNodeToggle={this.handleToggle.bind(this)}
				onNodeSelect={this.handleSelect.bind(this)}
			>
				{this.convertJsonToTreeItem(this.state.data, '')}
			</TreeView>
		)
	}
	// {"a": 1, "b": 2, "c": {"c1": 11, "c2": 22}}
	// [{"a": 1, "b": 2, "c": {"c1": 11, "c2": 22}}]

	render() {
		return (
			<>
				{this.convertJsonToTreeView}
			</>
		)
	}
}


export default withStyles(styles)(JsonEditor)
