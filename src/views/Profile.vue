<!-- 
	This is the user profile page, it uses the dashboard layout in: 
	"./layouts/Dashboard.vue" .
 -->

<template>
	<div>

		<!-- Header Background Image -->
		<div class="profile-nav-bg" style="background-image: url('images/bg-profile.jpg')"></div>
		<!-- / Header Background Image -->

		<!-- User Profile Card -->
		<a-card :bordered="false" class="card-profile-head" :bodyStyle="{padding: 0,}">
			<template #title>
				<a-row type="flex" align="middle">
					<a-col :span="24" :md="12" class="col-info">
						<a-avatar :size="74" shape="square" src="images/face-1.jpg" />
						<div class="avatar-info">
							<h4 class="font-semibold m-0">Ge Cheng</h4>
							<p>学生</p>
						</div>
					</a-col>
				
				</a-row>
			</template>
		</a-card>
		<!-- User Profile Card -->

		<a-row type="flex" :gutter="24">

			<!-- Platform Settings Column -->
			<a-col :span="24" :md="8" class="mb-24">

				<!-- Platform Settings Card -->
				<CardPlatformSettings></CardPlatformSettings>
				<!-- / Platform Settings Card -->

			</a-col>
			<!-- / Platform Settings Column -->

			<!-- Profile Information Column -->
			<a-col :span="24" :md="8" class="mb-24">

				<!-- Profile Information Card -->
				<CardProfileInformation></CardProfileInformation>
				<!-- / Profile Information Card -->

			</a-col>
			<!-- / Profile Information Column -->
			
			<!-- Conversations Column -->
			
			<!-- / Conversations Column -->

		</a-row>
		
		<!-- Projects Card -->
		
		<!-- / Projects Card -->

	</div>
</template>

<script>

	import CardPlatformSettings from "../components/Cards/CardPlatformSettings"
	import CardProfileInformation from "../components/Cards/CardProfileInformation"
	import CardConversations from "../components/Cards/CardConversations"
	import CardProject from "../components/Cards/CardProject"

	// Conversation's list data.
	const conversationsData = [
		{
			id: "1",
			title: "Sophie B.",
			code: "Hi! I need more information…",
			avatar: "images/face-3.jpg",
		},
		{
			id: "2",
			title: "Anne Marie",
			code: "Awesome work, can you…",
			avatar: "images/face-4.jpg",
		},
		{
			id: "3",
			title: "Ivan",
			code: "About files I can…",
			avatar: "images/face-5.jpeg",
		},
		{
			id: "4",
			title: "Peterson",
			code: "Have a great afternoon…",
			avatar: "images/face-6.jpeg",
		},
		{
			id: "5",
			title: "Nick Daniel",
			code: "Hi! I need more information…",
			avatar: "images/face-2.jpg",
		},
	] ;

	// Project cards data
	const projects = [
		{
			id: 1,
			title: "Modern",
			content: "As Uber works through a huge amount of internal management turmoil.",
			cover: "images/home-decor-3.jpeg",
			team: [
				"images/face-1.jpg",
				"images/face-4.jpg",
				"images/face-2.jpg",
				"images/face-3.jpg",
			],
		},
		{
			id: 2,
			title: "Scandinavian",
			content: "Music is something that every person has his or her own specific opinion about.",
			cover: "images/home-decor-2.jpeg",
			team: [
				"images/face-1.jpg",
				"images/face-4.jpg",
				"images/face-2.jpg",
				"images/face-3.jpg",
			],
		},
		{
			id: 3,
			title: "Minimalist",
			content: "Different people have different taste, and various types of music, Zimbali Resort.",
			cover: "images/home-decor-1.jpeg",
			team: [
				"images/face-1.jpg",
				"images/face-4.jpg",
				"images/face-2.jpg",
				"images/face-3.jpg",
			],
		},
	] ;

	export default ({
		components: {
			CardPlatformSettings,
			CardProfileInformation,
			CardConversations,
			CardProject,
		},
		data() {
			return {
				// Active button for the "User Profile" card's radio button group.
				profileHeaderBtns: 'overview',

				// Associating Conversation's list data with its corresponding property.
				conversationsData,

				// Project cards data
				projects,
			}
		},
	})

</script>

<style lang="scss">
</style>