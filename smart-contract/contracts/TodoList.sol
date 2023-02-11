// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

contract TodoList {
    uint256 public taskCount = 0;

    struct Task {
        uint id;
        string content;
        bool completed;
    }

    mapping(uint => Task) public tasks;

    event TaskCreated(uint id, string content, bool completed);

    event TaskRemoved(uint id);

    event TaskCompleted(uint id, bool completed);

    constructor() {
        createTask("Test task");
    }

    function createTask(string memory _content) public {
        uint256 taskId = taskCount;
        tasks[taskId] = Task(taskId, _content, false);
        taskCount++;

        emit TaskCreated(taskId, _content, false);
    }

    function removeTask(uint _id) public {
        delete tasks[_id];

        emit TaskRemoved(_id);
    }

    function getTasks() public view returns (Task[] memory) {
        Task[] memory result = new Task[](taskCount);
        uint index = 0;
        for (uint i = 0; i < taskCount; i++) {
            result[index++] = tasks[i];
        }
        return result;
    }

    function toggleCompleted(uint _id) public {
        Task memory _task = tasks[_id];
        _task.completed = !_task.completed;
        tasks[_id] = _task;

        emit TaskCompleted(_id, _task.completed);
    }
}
