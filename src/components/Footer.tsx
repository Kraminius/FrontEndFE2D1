interface FooterProps {
	creatorNames: string[];
}
export default function Footer({ creatorNames }: FooterProps) {
	return(
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
