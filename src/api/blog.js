import request from "../helpers/request"

const URL = {
  GET_LIST: '/blog',
  GET_DETAIL: '/blog/:blogId',
  CREATE: '/blog',
  UPDATE: '/blog/:blogId',
  DELETE: '/blog/:blogId'
}

export default {
  getBlogs({page = 1, userId, atIndex} = {page: 1}) {
    return request(URL.GET_LIST, 'GET', {page, userId, atIndex})
  },
  getDetail({blogId}) {
    return request(URL.GET_DETAIL.replace(':blogId', blogId))
  },
  updateBlog({blogId}, {title, content, description}) {
    return request(URL.UPDATE.replace(':blogId', blogId), 'PATCH', {title, content, description})
  },
  deleteBlog({blogId}) {
    return request(URL.DELETE.replace(':blogId', blogId), 'DELETE')
  },
  createBlog({title = '', content = '', description = ''} = {title: '', content: '', description: ''}) {
    return request(URL.CREATE, 'POST', {title, content, description})
  }
}