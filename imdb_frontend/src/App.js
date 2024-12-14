import { BrowserRouter, Outlet, Route, Routes } from 'react-router';
import IMDBRoot from './components/root/IMDBRoot';
import Navigation from './components/navigation/Navigation';
import Footer from './components/footer/Footer';
import Signup from './components/user/Signup';
import Login from './components/user/Login';
import Profile from './components/user/Profile';
import Title from './components/Title/Title';
import React from 'react';
import AllGenres from './components/genres/allGenres/AllGenres';
import SingularGenre from './components/genres/singularGenre/SingularGenre';
import TitleAlternatives from './components/Title/Alternatives/TitleAlternatives';
import AdvancedSearch from './components/advanced-search/AdvancedSearch';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Person from './components/Person/Person';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={
						<div>
							<Navigation />
							<Outlet />
							<Footer />
						</div>
					}
				>
					<Route index element={<IMDBRoot />} />
					<Route
						path="advanced-search"
						element={<AdvancedSearch />}
					/>
					<Route path="signup" element={<Signup />} />
					<Route path="login" element={<Login />} />
					<Route path="profile" element={<Profile />} />
					<Route path="/title/:tconst" element={<Title />} />
					<Route path="person/:nconst" element={<Person />} />
					<Route
						path="title/alternative/:tconst"
						element={<TitleAlternatives />}
					/>
					<Route path="/genres">
						<Route index element={<AllGenres />} />
						<Route path=":genreId" element={<SingularGenre />} />
					</Route>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
