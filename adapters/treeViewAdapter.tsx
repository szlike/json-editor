
import { TreeItem, TreeView } from '@material-ui/lab';
import React from 'react'

const rawData = [
    {
      id: 4730,
      uid: "9d93818c-0827-4ef1-b4a4-7b5116d6ed50",
      strain: "Colfax Jack",
      cannabinoid_abbreviation: "THCv",
      cannabinoid: "Cannabicyclic Acid",
      terpene: "α Cedrene",
      medical_use: "non-psychoactive",
      health_benefit: "relieves congestion",
      category: "flower",
      type: "sativa",
      buzzword: "private reserve",
      brand: "Orchid Essentials",
    },
    {
      id: 1846,
      uid: "ba08ade0-91d6-4fbd-b298-b2eaaa175158",
      strain: "Mendo Breath",
      cannabinoid_abbreviation: "CBDa",
      cannabinoid: "Tetrahydrocannabinolic Acid",
      terpene: "Terpinene",
      medical_use: "anti-psychotic",
      health_benefit: "kills or slows bacteria growth",
      category: "distillate",
      type: "hybrid",
      buzzword: "gram",
      brand: "Willie’s Reserve",
    },
  ]

export default class treeViewAdapter extends React.Component<{rawData: any}, {}>{
  rawData: any

  constructor(props: any){
    super(props)
    const {rawData} = props.rawData
    this.rawData = rawData
  }

  private isIterable(obj: any): boolean{
    if (obj == null) {
      return false;
    }
    return typeof obj[Symbol.iterator] === 'function';

  }

  public renderTreeView(){
    <TreeView
    // className={this.props.classes.root}
    defaultCollapseIcon={<ExpandMoreIcon />}
    defaultExpandIcon={<ChevronRightIcon />}
    expanded={this.state.expanded}
    selected={this.state.selected}
    onNodeToggle={this.handleToggle.bind(this)}
    onNodeSelect={this.handleSelect.bind(this)}
  >
    {/* {convertJsonToTreeItem(rawData, '1')} */}
    <TreeItem nodeId="1" label="Applications">
      <TreeItem nodeId="2" label="Calendar" />
      <TreeItem nodeId="3" label="Chrome" />
      <TreeItem nodeId="4" label="Webstorm" />
    </TreeItem>
    <TreeItem nodeId="5" label="Documents">
      <TreeItem nodeId="6" label="Material-UI">
      <TreeItem nodeId="7" label="src">
        <TreeItem nodeId="8" label="index.js" />
        <TreeItem nodeId="9" label="tree-view.js" />
      </TreeItem>
      </TreeItem>
    </TreeItem>
  </TreeView>
  }


  public convertJsonToTreeItem(jsonObject: any, nodeId: number) : JSX.Element{
    if (this.isIterable(jsonObject)){
      return this.convertJsonToTreeItem(jsonObject, nodeId+1)
    }
    return <TreeItem nodeId="1"></TreeItem>
  }
}  
