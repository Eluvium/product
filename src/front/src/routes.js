export const adminUsers = () => '/admin/users';
export const adminProjects = () => '/admin/projects';

export const showPhoto = ({ album = ':album', filename = ':filename' }) => `/photo/${album}/${filename}`;
