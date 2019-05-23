import React from 'react';
import ReactDOM from 'react-dom';
import debounce from 'lodash.debounce';

import Graph from './graph';
import {getSelectedOption} from '../utils';
import {
  ANIMATION,
  DOT_SIZE_CONFIG,
  GRAPH_LAYOUT_CONFIG,
  LEAF_SQUARE_CONFIG,
  TABLET_MODE_CONFIG
} from '../constants/index';

const animationLengths = {
  off: 0,
  on: 400,
  slow: 1500
}

class GraphPanel extends React.Component {
  componentDidMount() {
    window.addEventListener('resize', debounce(this.resize.bind(this), 50));
    this.resize();
  }

  resize() {
    const currentNode = ReactDOM.findDOMNode(this.refs.graphPanel);
    this.props.updateGraphPanelDimensions({
      height: currentNode.clientHeight,
      width: currentNode.clientWidth
    });
  }

  render() {
    const {
      configs,
      graphPanelDimensions,
      searchValue,
      timeFilter,
      username
    } = this.props;
    const tabletMode = getSelectedOption(configs, TABLET_MODE_CONFIG) === 'on';
    return (
      <div className="panel relative" id="graph-panel" ref="graphPanel">
        <Graph
          {...this.props}
          duration={animationLengths[getSelectedOption(configs, ANIMATION)]}
          graphLayout={getSelectedOption(configs, GRAPH_LAYOUT_CONFIG)}
          markSize={getSelectedOption(configs, DOT_SIZE_CONFIG)}
          squareLeafs={getSelectedOption(configs, LEAF_SQUARE_CONFIG) === 'on'}
          disallowLock={tabletMode}
          muteUnselected={searchValue || (timeFilter.min !== timeFilter.max)}
          height={graphPanelDimensions.get('height')}
          username={username}
          width={graphPanelDimensions.get('width')}
          />
      </div>
    );
  }
}

export default GraphPanel;
