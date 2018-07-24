import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { LogWorkout } from './components/LogWorkout';

export const routes = <Layout>
    <Route exact path='/' component={ LogWorkout } />
</Layout>;
