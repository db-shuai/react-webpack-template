import React from "react";
import { observer } from "mobx-react";
import Split from "react-split";
import './index.less'

const JsonEditor: React.FC = () => {
  return (
    <div className="json-editor">
      <Split className="split">
        <div className="editor__origin">

        </div>
        <div className="editor__output">
          
        </div>
      </Split>
    </div>
  );
};

export default observer(JsonEditor);
