import { StudentModel } from './student-model';

describe('StudentModel', () => {
  it('should create an instance', () => {
    expect(new StudentModel()).toBeTruthy();
  });

  it("should have 'Aubert' as last name", () => {
    const student: StudentModel = new StudentModel()
    student.lastName = 'Aubert'
    student.email = 'jl-aub@gmail.com'
    student.login = "jlaubert"
    student.password = "toto"

    expect(student.lastName).toBe('Aubert')
  })
});
