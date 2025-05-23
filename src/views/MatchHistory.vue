<!-- 
	This is the dashboard page, it uses the dashboard layout in: 
	"./layouts/Dashboard.vue" .
 -->

 <template>
	<div>
		<!-- Table & Timeline -->
		<a-row :gutter="24" type="flex" align="stretch">
			<!-- Table -->
			<a-col :span="24" :lg="16" class="mb-24">
				
				<!-- Projects Table Card -->
				<CardMatchTable
				></CardMatchTable>
				<!-- / Projects Table Card -->
				
			</a-col>
			<!-- / Table -->

			<!-- Timeline -->
			<a-col :span="24" :lg="8" class="mb-24">

				<!-- Orders History Timeline Card -->
				<CardOrderHistory></CardOrderHistory>
				<!-- / Orders History Timeline Card -->

			</a-col>
			<!-- / Timeline -->
		</a-row>


		

	</div>
</template>

<script>
	// "Projects" table component.
	import CardMatchTable from '../components/Cards/CardMatchTable' ;

	// Order History card component.
	import CardOrderHistory from '../components/Cards/CardOrderHistory' ;

	

	export default ({
		components: {
			CardMatchTable,
			CardOrderHistory,
		},
		data() {
			return {
			}
		},
	})

</script>

<style lang="scss">
</style>