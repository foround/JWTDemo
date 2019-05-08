<template>
    <section class="container">
        <b-card
			title="Welcome"
			img-src="https://picsum.photos/600/300/?image=25"
			img-alt="Image"
			img-top
			tag="article"
			class="mb-10 custom-b-card"
		>
			<b-card-body >
				<b-form inline>
					<label class="sr-only" for="inline-form-input-name">username</label>
					<b-input
						id="inline-form-input-name"
						class="mb-2 mr-sm-2 mb-sm-0 custom-input"
						placeholder="username"
						v-model='userInfo.username'
					/>

					<label class="sr-only" for="inline-form-input-username">password</label>
					<b-input-group prepend="@" class="mb-2 mr-sm-2 mb-sm-0">
						<b-input
							type='password'
							id="inline-form-input-username"
							class='custom-input'
							placeholder="password"
							v-model='userInfo.password'
						/>
					</b-input-group>
				</b-form>
			</b-card-body>

			<b-button variant="primary" v-focus @click="submit"  @keypress="submit">login</b-button>
		</b-card>
    </section>
</template>

<script>
export default {
	name: 'name',
	data: function () {
		return {
			userInfo:{
				username: '',
				password: ''
			}
		}
	},
	directives: {
		focus: {
			inserted: function (el) {
				el.focus()
			}
		}
	},
	methods: {
		async submit(e){
			e.preventDefault()
			let {username,password} = this.userInfo
			let res = await this.axios.post('/login',this.userInfo)
			if(res.errcode === 2000){
				let {token} = res.data;
				localStorage.setItem('token',token);
				this.$router.push('/index')
			}
		}
	}
}
</script>

<style scoped>
	.custom-b-card{
		max-width: 30rem;
		margin: 0 auto;
	}
	.custom-input{
		max-width: 8rem;
	}
</style>
