import React, { useState } from 'react' 
import { useDispatch } from 'react-redux';
import { fetchTreeNodeData, updateTreeNodeData } from '../../../../store/actions/TreeStates';

const Tree = ({ data = [] }) => {
    return (
        <div className="d-tree">
            <ul className="tree">
                {/* <ul className="d-flex d-tree-container flex-column"> */}
                {data.map((tree , index) => (
                    <TreeNode node={tree} key={index}/>
                ))}
            </ul>
        </div>
    );
};

const TreeNode = ({ node }) => {
    const dispatch = useDispatch();
    const [childVisible, setChildVisiblity] = useState(false);

    const hasChild = node.children ? true : false;

    return (
        <li className="d-tree-node border-0 py-0 ">
            <span className="d-flex hoverClass">
                {hasChild && (
                    <div
                        className={`d-inline d-tree-toggler cirdularDesign ${childVisible ? "active" : ""
                            }`}
                    >
                        <i className={childVisible ? "fa fa-minus-square-o" : "fa fa-plus-square-o"} style={{ fontSize: "14px" }} onClick={(e) => setChildVisiblity((v) => !v)}></i>
                    </div>
                )}
                <div className="col d-tree-head">
                    <i className={`mr-1 ${node.level <= 4 ? childVisible ? "fa fa-folder-open" : "fa fa-folder" : childVisible ? "fa fa-file" : "fa fa-file"}  icon-color-${node.level}`}> </i>
                  <span onClick={()=> { 
                    dispatch(updateTreeNodeData(node));
                    dispatch(fetchTreeNodeData());
                     }}>  {node.name}</span> {node.code ===""? '':<span className='text-danger'> {`(${node.code})`}</span>}
                </div>
            </span>

            {hasChild && childVisible && (
                <div className="d-tree-content">
                    <ul className="d-flex d-tree-container flex-column">
                        <Tree data={node.children} />
                    </ul>
                </div>
            )}
        </li>
    );
};

export default Tree;
