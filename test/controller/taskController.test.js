const httpMock = require('node-mocks-http');
const { createTask, updateTaskStatus } = require('../../controllers/tasksController');
const Task = require('../../models/Task');

jest.mock('../../models/Task');

describe('taskController test', () => {

  beforeAll(() => {
   jest.clearAllMocks(); 
  });

  describe('when createTask is called with a new task data', () => {
    test('should create a new task', async () => {
      const mockTask = { name: 'test task', description: 'some desc here' }

      Task.create.mockResolvedValue(mockTask);

      const request = httpMock.createRequest({
        body: {
          name: 'test task',
          description: 'some desc here'
        }
      });

      const respose = httpMock.createResponse();

      await createTask(request, respose);

      expect(respose.statusCode).toBe(200);

      expect(respose._getJSONData()).toEqual({
        ok: true,
        msg: 'Task created!',
        data: {
          name: mockTask.name,
          description: mockTask.description,
          isDone: false
        }
      });
    });
  });
  describe('When createTask receive existing task name', () => { 
    test('should returns a task existing error', async () => {
      const mockTask = { name: 'test task', description: 'some desc here' }

      Task.findOne.mockResolvedValue(mockTask);

      const request = httpMock.createRequest({
        body: {
          name: 'test task',
          description: 'some another description here!'
        }
      });

      const respose = httpMock.createResponse();

      await createTask(request, respose);

      expect(respose.statusCode).toBe(400);
      
      expect(respose._getJSONData()).toEqual({
        ok: false,
        error: {
          message: 'Task already exists with this name'
        }
      });
    });
  })

  describe('When createTask raise an error', () => { 
    test('should raise an error', async () => {
      Task.findOne.mockRejectedValue(new Error('Something went wrong!'));

      const request = httpMock.createRequest({
        body: {
          name: 'test task',
          description: 'some another description here!'
        }
      });

      const respose = httpMock.createResponse();


      await createTask(request, respose);

      expect(respose.statusCode).toBe(500);

      const { ok, error: { message } } = respose._getJSONData()

      expect(ok).toBe(false);
      expect(message).toEqual('Something went wrong!');
    });
  });

  describe('when createTask receive empty data', () => {
    test('should not create anything', async () => {
      const mockTask = { name: '', description: '' }

      Task.create.mockResolvedValue(mockTask);

      const request = httpMock.createRequest({
        body: {
          name: '',
          description: ''
        }
      });

      const respose = httpMock.createResponse();

      await createTask(request, respose);

      console.log(respose._getJSONData());

      // expect(respose.statusCode).toBe(400);

    });
  })

  describe('when updateTaskStatus is called with a valid id', () => {
    test('should update the task isDone status', async () => {
      const mockTask = {
        _id: '123',
        name: 'test task',
        description: 'some desc here',
        isDone: false,
        save: jest.fn().mockResolvedValue(true)
      };

      Task.findById.mockResolvedValue(mockTask);

      const request = httpMock.createRequest({
        params: { id: '123' },
        body: { isDone: true }
      });

      const respose = httpMock.createResponse();

      await updateTaskStatus(request, respose);

      expect(mockTask.isDone).toBe(true);
      expect(mockTask.save).toHaveBeenCalled();
      expect(respose.statusCode).toBe(200);

      expect(respose._getJSONData()).toEqual({
        ok: true,
        msg: 'Task updated!',
        data: {
          _id: mockTask._id,
          name: mockTask.name,
          description: mockTask.description,
          isDone: true
        }
      });
    });
  });

  describe('when updateTaskStatus is called with a non-existing id', () => {
    test('should return a task not found error', async () => {
      Task.findById.mockResolvedValue(null);

      const request = httpMock.createRequest({
        params: { id: 'unknown-id' },
        body: { isDone: true }
      });

      const respose = httpMock.createResponse();

      await updateTaskStatus(request, respose);

      expect(respose.statusCode).toBe(404);

      expect(respose._getJSONData()).toEqual({
        ok: false,
        error: {
          message: 'Task not found'
        }
      });
    });
  });

  describe('when updateTaskStatus raises an error', () => {
    test('should raise an error', async () => {
      Task.findById.mockRejectedValue(new Error('Something went wrong!'));

      const request = httpMock.createRequest({
        params: { id: '123' },
        body: { isDone: true }
      });

      const respose = httpMock.createResponse();

      await updateTaskStatus(request, respose);

      expect(respose.statusCode).toBe(500);

      const { ok, error: { message } } = respose._getJSONData()

      expect(ok).toBe(false);
      expect(message).toEqual('Something went wrong!');
    });
  });
})
