import config from 'config';
import { authHeader, handleResponse } from '_helpers';
import { backendService } from './backend.service';

function getAll() {
  return backendService.GET('project', 'all', {});
}

function getOne({ id }) {
  const requestOptions = { method: 'GET', headers: authHeader() };
  return fetch(`${config.apiUrl}/api/project/${id}`, requestOptions)
    .then(handleResponse);
}

/**
 * Create project
 * @param {string} name
 * @param {string} project
 * @param {Array<string>} tp
 * @return {Promise<string>}
 */
function create({
  project, name, tp,
}) {
  return fetch(`${config.apiUrl}/api/project/create`, {
    method: 'POST',
    headers: {
      ...authHeader(),
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      name,
      project,
      tp,
    }),
  })
    .then(handleResponse);
}

/**
 * Update project
 * @param {string} id
 * @param {string} name
 * @param {Array<string>} tp
 * @param {string} project
 * @return {Promise<string>}
 */
function update({
  id, name, tp, project,
}) {
  return fetch(`${config.apiUrl}/api/project/update/${id}`, {
    method: 'POST',
    headers: {
      ...authHeader(),
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      name,
      tp,
      project,
    }),
  })
    .then(handleResponse);
}

/**
 * Delete project
 * @param {string} id
 * @return {Promise<string>}
 */
function remove({ id }) {
  return fetch(`${config.apiUrl}/api/project/remove/${id}`, {
    method: 'POST',
    headers: {
      ...authHeader(),
      'Content-Type': 'application/json;charset=utf-8',
    },
  })
    .then(handleResponse);
}

const projectService = {
  getAll,
  create,
  update,
  remove,
};

export default projectService;
