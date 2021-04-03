import React from 'react';
import { Link } from 'react-router-dom';
import "./styles.css";

const NotFound = () => (
    <div className="notfound-container">
	<div id="notfound">
		<div className="notfound">
			<div>
				<div className="notfound-404">
					<h1>!</h1>
				</div>
				<h2>Error 404</h2>
			</div>
			<p>The page you are looking for might have been removed had its name changed or is temporarily unavailable. <Link to="/">Back to homepage</Link></p>
		</div>
	</div>
    </div>
);

export default NotFound;