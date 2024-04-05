interface FooterProps {
	creatorNames: string[];
}

function Header() {
	return (
		<header className="header">
			<img src="src/images/BS_Logo.png" alt="Our Logo" className="header_image" />
			<div className="brand_name">
				<h1>BUY STUFF</h1>
			</div>
		</header>
	);

}
function Footer({ creatorNames }: FooterProps) {
	return (
		<footer>
			<hr />
			<div className="foot_paragraph">
				<p>Created by FE-2:</p>
			</div>
			<ul id="footer-list">
				{creatorNames.map((creatorName: string) => (
					<li key={creatorName}>{creatorName}</li>
				))}
			</ul>
		</footer>
	)
}

export { Header, Footer };