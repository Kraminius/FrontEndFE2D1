interface FooterProps {
	creatorNames: string[];
}
export default function Footer({ creatorNames }: FooterProps) {
	return(
	<footer>
		<hr />
		<p>Created by FE-2:</p>
		<ul id="footer-list">
			{creatorNames.map((creatorName: string) => (
				<li key={creatorName}>{creatorName}</li>
			))}
		</ul>
	</footer>
	)
}
