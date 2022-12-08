import getTreeKeys from './getTreeKeys.js';

const genDiffTree = (file1 = {}, file2 = {}) => {
	const getNodesWithoutMarkers = (file1, file2) => {
		const keys = getTreeKeys(file1, file2);
		const nodesWithoutMarkers = keys.reduce((node, key) => {
			const nodeItem = {};
			if (typeof file2[key] !== 'object' && typeof file1[key] !== 'object') {
				if (file2 === 0) {
					nodeItem.key = key;
					nodeItem.value = file1[key];
					nodeItem.status = 'nomod';
					node.push(nodeItem);
					return node;
				} else {
					nodeItem.key = key;
					nodeItem.value = file2[key];
					nodeItem.status = 'nomod';
					node.push(nodeItem);
					return node;
				}
			} else {
				if (file2 === 0) {
					nodeItem.key = key;
					nodeItem.value = getNodesWithoutMarkers(file1[key], 0);
					nodeItem.status = 'nomod';
					node.push(nodeItem);
					return node;
				} else {
					nodeItem.key = key;
					nodeItem.value = getNodesWithoutMarkers(0, file2[key]);
					nodeItem.status = 'nomod';
					node.push(nodeItem);
					return node;
				}
			}
		}, []);
		return nodesWithoutMarkers;
	};

	const getNodesWithMarkers = (file1 = {}, file2 = {}) => {
		const keys = getTreeKeys(file1, file2);
		const nodesWithMarkers = keys.reduce((node, key) => {
			const nodeItem = {};
			if (Object.keys(file1).includes(key)) {
				if (Object.keys(file2).includes(key)) {
					if (typeof file1[key] !== 'object' && typeof file2[key] !== 'object') {
						if (file1[key] === file2[key]) {
							nodeItem.key = key;
							nodeItem.value = file1[key];
							nodeItem.status = 'nomod';
							node.push(nodeItem);
							return node;
						} else {
							nodeItem.key = key;
							nodeItem.value = file1[key];
							nodeItem.status = 'changed_from';
							node.push(nodeItem);
							const nodeItemChangeTo = {};
							nodeItemChangeTo.key = key;
							nodeItemChangeTo.value = file2[key];
							nodeItemChangeTo.status = 'changed_to';
							node.push(nodeItemChangeTo);
							return node;
						}
					} else if (typeof file1[key] === 'object' && typeof file2[key] !== 'object') {
						if (file1[key] === null) {
							nodeItem.key = key;
							nodeItem.value = file1[key];
							nodeItem.status = 'changed_from';
							node.push(nodeItem);
						} else {
							nodeItem.key = key;
							nodeItem.value = getNodesWithoutMarkers(file1[key], 0);
							nodeItem.status = 'changed_from';
							node.push(nodeItem);
						}
						const nodeItemChangeTo = {};
						nodeItemChangeTo.key = key;
						nodeItemChangeTo.value = file2[key];
						nodeItemChangeTo.status = 'changed_to';
						node.push(nodeItemChangeTo);
						return node;
					} else if (typeof file1[key] !== 'object' && typeof file2[key] === 'object') {
						nodeItem.key = key;
						nodeItem.value = file1[key];
						nodeItem.status = 'changed_from';
						node.push(nodeItem);
						if (file2[key] === null) {
							const nodeItemChangeTo = {};
							nodeItemChangeTo.key = key;
							nodeItemChangeTo.value = file2[key];
							nodeItemChangeTo.status = 'changed_to';
							node.push(nodeItemChangeTo);
							return node;
						} else {
							const nodeItemChangeTo = {};
							nodeItemChangeTo.key = key;
							nodeItemChangeTo.value = getNodesWithoutMarkers(0, file2[key]);
							nodeItemChangeTo.status = 'changed_to';
							node.push(nodeItemChangeTo);
							return node;
						}
					} else {
						nodeItem.key = key;
						nodeItem.value = getNodesWithMarkers(file1[key], file2[key]);
						nodeItem.status = 'nomod';
						node.push(nodeItem);
						return node;
					}
				} 
				if (typeof file1[key] !== 'object') {
					nodeItem.key = key;
					nodeItem.value = file1[key];
					nodeItem.status = 'deleted';
					node.push(nodeItem);
					return node;
				} else {
					nodeItem.key = key;
					nodeItem.value = getNodesWithoutMarkers(file1[key], 0);
					nodeItem.status = 'deleted';
					node.push(nodeItem);
					return node;
				}
			}
			if (typeof file1[key] !== 'object' && typeof file2[key] !== 'object') {
				nodeItem.key = key;
				nodeItem.value = file2[key];
				nodeItem.status = 'added';
				node.push(nodeItem);
				return node;
			} else {				
				nodeItem.key = key;
				nodeItem.value = getNodesWithoutMarkers(0, file2[key]);
				nodeItem.status = 'added';
				node.push(nodeItem);
				return node;
			}
		}, []);
		return nodesWithMarkers;
	};
	return getNodesWithMarkers(file1, file2);
};

export default genDiffTree;