import * as express from 'express';
import * as busboyBodyParser from 'busboy-body-parser';
import * as bodyParser from 'body-parser';
import * as session from 'express-session';
import * as morgan from 'morgan';
import * as flash from 'connect-flash';
import * as passport from 'passport';
import * as cors from 'cors';
import { LogServices } from 'appknit-backend-bundle';
import Constants from './Constants';
import RoutesActivator from './routes';

class App {
  public express;

  constructor() {
     this.express = express();

     /**
	  * Injecting the middlewares
	  */
	 this.injectMiddlewares();

	 /**
	  * mounting the routes
	  */
     this.mountRoutes();
  }

  private mountRoutes(): void {
	  const router = express.Router();
	  const env = process.env.NODE_ENV || 'development';
	  router.get('/', (req, res) => res.send(`<h1>App ${env} Environment</h1>`));

	  this.express.use('/', router);
	  new RoutesActivator(this.express);
  }

  private injectMiddlewares(): void {
      this.express.use(cors({
          origin: '*',
          methods: ['GET', 'POST'],
          allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With',
            'X-HTTP-Method-Override', 'Accept'],
        credentials: true,
      }));

      this.express.use(bodyParser.json());
      this.express.use(bodyParser.urlencoded({ extended: true }));
      this.express.use(busboyBodyParser());
      this.express.use(LogServices.RequestInterceptor);
      if (process.env.NODE_ENV !== 'production') {
          this.express.use(LogServices.ResponseInterceptor);
      }
      this.express.use(morgan('dev'));
	  this.express.use(session({ secret: Constants.secretString, resave: true, saveUninitialized: true }));
	  this.express.use(passport.initialize());
	  this.express.use(flash());
  }
}

export default new App().express;
