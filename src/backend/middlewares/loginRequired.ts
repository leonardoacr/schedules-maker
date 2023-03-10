import { Request, Response } from 'express';
const errors: string[] = [];
const middlewareLoginRequired = async (
  req: Request,
  res: Response,
  next: () => void
) => {
  //console.log('User authentication middleware...');
  if (!req.session.authenticated) {
    //console.log('User not authenticated:' + req);

    errors.push('User login timeout expired, please sign in again.');
    if (errors.length > 0) {
      req.session.save(() => {
        req.flash('errors', errors);
        return res.redirect('/');
      });
    }
    return;
  }
  //console.log('User has been authenticated.');
  next();
};

export { middlewareLoginRequired };
