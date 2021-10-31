<?php

namespace Database\Factories;

use App\Models\Question;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\Factory;

class QuestionFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Question::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $title = $this->faker->sentence() . "?";
        $slug = Str::slug($title);

        return [
            'user_id' => $this->faker->numberBetween(1, 50),
            'title' => $title,
            'body' => $this->faker->paragraph(),
            'slug' => $slug
        ];
    }
}
