import ProjectService from '../ProjectService';

describe('ProjectServices Testing',() => {
   
    test('can get projects', async () => {
        const projects = await  ProjectService.getProjects();
        console.log(projects);
        expect(typeof projects).toBe("object");
    });
  
    test('can get project', async () => {
        const project = await ProjectService.getProject(1);
        console.log(project);
        expect(typeof project).toBe("object");
    });
  });